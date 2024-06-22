import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WsException } from "@nestjs/websockets";

export const UserEmailSocket = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const client = ctx.switchToWs().getClient();
    const token = client.handshake.headers.authorization;

    if (!token) {
      throw new WsException("Unauthorized access");
    }

    try {
      const jwtService = new JwtService();
      const decodedToken = jwtService.verify(token);
      const email = decodedToken.email;
      return email;
    } catch (error) {
      throw new WsException("Unauthorized access");
    }
  }
);

