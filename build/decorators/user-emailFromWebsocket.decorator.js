"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmailSocket = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const websockets_1 = require("@nestjs/websockets");
exports.UserEmailSocket = (0, common_1.createParamDecorator)((data, ctx) => {
    const client = ctx.switchToWs().getClient();
    const token = client.handshake.headers.authorization;
    if (!token) {
        throw new websockets_1.WsException("Unauthorized access");
    }
    const options = {
        secret: "JWT_SECRET",
        signOptions: { expiresIn: '60s' },
    };
    try {
        const jwtService = new jwt_1.JwtService(options);
        const decodedToken = jwtService.verify(token);
        const email = decodedToken.email;
        return email;
    }
    catch (error) {
        throw new websockets_1.WsException("Unauthorized access");
    }
});
//# sourceMappingURL=user-emailFromWebsocket.decorator.js.map