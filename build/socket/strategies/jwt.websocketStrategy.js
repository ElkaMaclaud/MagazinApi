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
exports.WebSocketJwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const websockets_1 = require("@nestjs/websockets");
let WebSocketJwtStrategy = class WebSocketJwtStrategy {
    constructor(configService, jwtService) {
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async validate(socket) {
        const token = socket.handshake.auth.token;
        if (!token) {
            throw new websockets_1.WsException("Unauthorized access");
        }
        try {
            const decoded = this.jwtService.verify(token);
            return decoded;
        }
        catch (error) {
            throw new websockets_1.WsException("Unauthorized access");
        }
    }
};
WebSocketJwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, jwt_1.JwtService])
], WebSocketJwtStrategy);
exports.WebSocketJwtStrategy = WebSocketJwtStrategy;
//# sourceMappingURL=jwt.websocketStrategy.js.map