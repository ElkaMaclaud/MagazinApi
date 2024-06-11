import { BadRequestException, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

export const ACCES_TOKEN_VERIFY_ERROR = "Ошибка при верификации токена: ";

export class GetUserData {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}
  async getEmail(req: Request) {
    const accessToken = req.headers["authorization"]?.split(" ")[1];
    if (accessToken) {
      try {
        const decodedToken = this.jwtService.verify(
          accessToken,
          this.configService.get("JWT_SECRET"),
        );
        const userEmail = decodedToken.email;
        return userEmail;
      } catch (error) {
        throw new BadRequestException(ACCES_TOKEN_VERIFY_ERROR, error);
      }
    } else {
      throw new BadRequestException("Отсутствует токен доступа");
    }
  }
}
 