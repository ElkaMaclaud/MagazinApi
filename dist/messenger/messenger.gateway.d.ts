import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from 'source/user/user.service';
export declare const activeSockets: {};
export declare class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly userService;
    server: Server;
    constructor(userService: UserService);
    handleConnection(socket: Socket): Promise<void>;
    handleDisconnect(socket: Socket): void;
    handleJoinRoom(socket: Socket, chatId: string): void;
    handleChatMessage(socket: Socket, msg: string): Promise<void>;
    handleMessageRead(socket: Socket, messageId: string): Promise<void>;
    handlePreviousMessages(socket: Socket, chatId: string): Promise<void>;
}
