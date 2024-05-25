import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { AuthModel } from "./auth.model";
import { AuthDto } from "./dto/auth.dto";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel) private readonly userModel: ModelType<AuthModel>,
    private readonly jwtService: JwtService,
  ) {}

  // Необходимо добавить хэширование
  async registerUser(dto: AuthDto) {
    const user = new this.userModel({ ...dto });
    return user.save();
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
