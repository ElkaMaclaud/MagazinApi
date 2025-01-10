"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = exports.activeSockets = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt = require("jsonwebtoken");
const message_model_1 = require("source/models/message.model");
const user_service_1 = require("../user/user.service");
const dotenv_1 = require("dotenv");
dotenv_1.default.config();
exports.activeSockets = {};
let SocketService = class SocketService {
    constructor(userService) {
        this.userService = userService;
    }
    async handleConnection(socket) {
        const jwtToken = socket.handshake.headers['authorization'];
        if (jwtToken) {
            const token = jwtToken.split(' ')[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.error('Unauthorized connection attempt');
                    socket.disconnect();
                    return;
                }
                socket.data.userId = decoded.id;
                exports.activeSockets[socket.data.userId] = socket;
                console.log(`Client connected: ${socket.data.userId}`);
            });
        }
        else {
            console.error('Unauthorized connection attempt');
            socket.disconnect();
        }
    }
    handleDisconnect(socket) {
        console.log(`Client disconnected: ${socket.data.userId}`);
        delete exports.activeSockets[socket.data.userId];
    }
    handleJoinRoom(socket, chatId) {
        socket.join(chatId);
        console.log(`Client joined room: ${chatId} with socket ID: ${socket.id}`);
    }
    async handleChatMessage(socket, msg) {
        const userId = socket.data.userId;
        const chatId = socket.handshake.query.chatId;
        const message = new message_model_1.Message({
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
                const participantSocket = exports.activeSockets[participant];
                if (participantSocket && participantSocket.rooms.has(chatId)) {
                    console.log(`Sending message to participant: ${participant}`, updatedMessageObject);
                    this.server.to(participantSocket.id).emit('chat message', updatedMessageObject);
                }
            });
        }
        catch (error) {
            console.error('Error saving message:', error);
        }
    }
    async handleMessageRead(socket, messageId) {
        console.log(`Message read: ${messageId} by user ${socket.data.userId}`);
        try {
            await message_model_1.Message.findByIdAndUpdate(messageId, { status: 'read' });
            const chatId = socket.handshake.query.chatId;
            this.server.to(chatId).emit('message status updated', {
                messageId,
                status: 'read',
                userId: socket.data.userId,
            });
        }
        catch (error) {
            console.error('Error updating message status:', error);
        }
    }
    async handlePreviousMessages(socket, chatId) {
        try {
            const messages = await message_model_1.Message.find({ chatId });
            socket.emit('previous messages', messages);
        }
        catch (error) {
            console.error('Error fetching previous messages:', error);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketService.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join room'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], SocketService.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('chat message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], SocketService.prototype, "handleChatMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('message read'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], SocketService.prototype, "handleMessageRead", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('previous messages'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], SocketService.prototype, "handlePreviousMessages", null);
SocketService = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: ["http://localhost:3001", "https://magazin-ruby.vercel.app"],
            methods: ["GET", "POST"],
            allowedHeaders: ["Authorization", "Content-Type"],
            credentials: true,
        },
    }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], SocketService);
exports.SocketService = SocketService;
//# sourceMappingURL=messenger.gateway.js.map