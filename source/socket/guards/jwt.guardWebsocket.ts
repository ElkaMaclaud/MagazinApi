import { AuthGuard } from "@nestjs/passport";

export class JwtAuthGuardWebsocket extends AuthGuard("jwt") {}
