import { Injectable, UseGuards } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { JwtAuthGuard } from 'src/user/guards/jwt.guard';

@WebSocketGateway({
    cors: {
        origin: "*"
    }
})
export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    // @UseGuards(JwtAuthGuard)
    handleConnection(@UserEmail() email: string) {
        console.log("CONNECTED")
    }

    handleDisconnect() {
        console.log("DISCONNECTED")
    }

    handleMessage(client: any, payload: any) {
        console.log("Received message:", payload);
        this.server.emit('message', payload);
    }
}
