import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Socket } from "socket.io";
export declare class WebSocketJwtStrategy {
    private readonly configService;
    private readonly jwtService;
    constructor(configService: ConfigService, jwtService: JwtService);
    validate(socket: Socket): Promise<any>;
}
