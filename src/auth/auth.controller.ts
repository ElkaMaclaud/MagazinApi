import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { ALREADY_REGISTERED_ERROR } from "./auth.constant";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("register")
  async register(@Body() dto: AuthDto) {
    const user = await this.authService.findUser(dto.email);
    if (user) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }
    return this.authService.registerUser(dto);
  }

  @HttpCode(200)
  @Post("login")
  async login(@Body() { email: login, password }: AuthDto) {
    const { email } = await this.authService.validateUser(login, password);
    return this.authService.login(email);
  }
}
