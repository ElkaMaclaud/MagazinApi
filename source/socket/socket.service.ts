import { Injectable, UseGuards } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { UserEmailSocket } from "source/decorators/user-emailFromWebsocket.decorator";
import { JwtAuthGuard } from "source/user/guards/jwt.guard";
import { JwtAuthGuardWebsocket } from "./guards/jwt.guardWebsocket";

@WebSocketGateway({
  //   transports: ["socket"],
  cors: {
    origin: "*",
  },
})

export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  firsConnect: boolean;
  constructor() {
    this.firsConnect = true
  }

  @UseGuards(JwtAuthGuardWebsocket)
  handleConnection(@UserEmailSocket() email: string) {
    console.log("CONNECTED");
    this.firsConnect  && this.server.emit("message", "Hello from server, ElkaMaclaud");
    this.firsConnect = false
  }

  handleDisconnect() {
    console.log("DISCONNECTED");
  }

  @SubscribeMessage("message")
  handleMessage(client: any, payload: string) {
    console.log("Received message:", payload);
    this.server.emit("message", "Ваше сообщение: " + payload);
  }
}
