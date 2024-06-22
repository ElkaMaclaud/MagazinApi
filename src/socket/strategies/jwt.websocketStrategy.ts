import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";

@Injectable()
export class WebSocketJwtStrategy {
  constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService) {}

  async validate(socket: Socket) {
    const token = socket.handshake.auth.token; 
    if (!token) {
      throw new WsException("Unauthorized access");
    }
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new WsException("Unauthorized access");
    }
  }
}
