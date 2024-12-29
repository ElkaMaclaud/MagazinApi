import { Injectable } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { Message } from 'source/models/message.model'; 
import { UserService } from 'source/user/user.service'; 
import dotenv from 'dotenv';

dotenv.config();

export const activeSockets = {};

@WebSocketGateway({
  cors: {
    origin: ["http://localhost:3001", "https://magazin-ruby.vercel.app"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  },
})
@Injectable()
export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly userService: UserService) {}

  async handleConnection(socket: Socket) {
    const jwtToken = socket.handshake.headers['authorization'];
    if (jwtToken) {
      const token = jwtToken.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded: any) => {
        if (err) {
          console.error('Unauthorized connection attempt');
          socket.disconnect();
          return;
        }
        socket.data.userId = decoded.id;
        activeSockets[socket.data.userId] = socket;
        console.log(`Client connected: ${socket.data.userId}`);
      });
    } else {
      console.error('Unauthorized connection attempt');
      socket.disconnect();
    }
  }

  handleDisconnect(socket: Socket) {
    console.log(`Client disconnected: ${socket.data.userId}`);
    delete activeSockets[socket.data.userId];
  }

  @SubscribeMessage('join room')
  handleJoinRoom(socket: Socket, chatId: string) {
    socket.join(chatId);
    console.log(`Client joined room: ${chatId} with socket ID: ${socket.id}`);
  }

  @SubscribeMessage('chat message')
  async handleChatMessage(socket: Socket, msg: string) {
    const userId = socket.data.userId;
    const chatId = socket.handshake.query.chatId;

    const message = new Message({
      content: msg,
      senderId: userId,
      chatId,
      status: 'sent',
    });

    try {
      await message.save();
      console.log('Message saved to database');

      const messageObject = {
        _id: message._id.toString(),
        content: msg,
        senderId: userId,
        chatId,
        status: 'sent',
      };

      const participants = await this.userService.getChatParticipants(chatId);

      participants.forEach((participant) => {
        const updatedMessageObject = {
          ...messageObject,
          chatId,
        };
        if (participant !== userId) {
          updatedMessageObject.status = 'delivered';
        }
        const participantSocket = activeSockets[participant];
        if (participantSocket && participantSocket.rooms.has(chatId)) {
          console.log(`Sending message to participant: ${participant}`, updatedMessageObject);
          this.server.to(participantSocket.id).emit('chat message', updatedMessageObject);
        }
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  }

  @SubscribeMessage('message read')
  async handleMessageRead(socket: Socket, messageId: string) {
    console.log(`Message read: ${messageId} by user ${socket.data.userId}`);

    try {
      await Message.findByIdAndUpdate(messageId, { status: 'read' });
      const chatId = socket.handshake.query.chatId;
      this.server.to(chatId).emit('message status updated', {
        messageId,
        status: 'read',
        userId: socket.data.userId,
      });
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  }

  @SubscribeMessage('previous messages')
  async handlePreviousMessages(socket: Socket, chatId: string) {
    try {
      const messages = await Message.find({ chatId });
      socket.emit('previous messages', messages);
    } catch (error) {
      console.error('Error fetching previous messages:', error);
    }
  }
}