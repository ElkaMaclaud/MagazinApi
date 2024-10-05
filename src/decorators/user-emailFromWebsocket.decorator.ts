import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtModuleOptions, JwtService } from "@nestjs/jwt";
import { WsException } from "@nestjs/websockets";

export const UserEmailSocket = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => { // configService: ConfigService
    
    const client = ctx.switchToWs().getClient();
    const token = client.handshake.headers.authorization;

    if (!token) {
      throw new WsException("Unauthorized access");
    }
    const options: JwtModuleOptions = {
      secret: "JWT_SECRET", 
      signOptions: { expiresIn: '60s' }, 
    };

    try {
      const jwtService = new JwtService(options);
      const decodedToken = jwtService.verify(token);
      const email = decodedToken.email;
      return email;
    } catch (error) {
      throw new WsException("Unauthorized access");
    }
  }
);

