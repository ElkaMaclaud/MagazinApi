import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("register")
  async register(@Body() dto: AuthDto) {
    return this.authService.registerUser(dto);
  }

  @HttpCode(200)
  @Post("login")
  async login(@Body() { email: login, password }: AuthDto) {
    const { email } = await this.authService.validateUser(login, password);
    return this.authService.login(email);
  }
}
