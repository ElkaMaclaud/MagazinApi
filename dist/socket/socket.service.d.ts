import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server } from "socket.io";
export declare class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    firsConnect: boolean;
    constructor();
    handleConnection(email: string): void;
    handleDisconnect(): void;
    handleMessage(client: any, payload: string): void;
}
