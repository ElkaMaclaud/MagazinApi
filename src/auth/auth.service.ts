import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { AuthModel } from "./auth.model";
import { AuthDto } from "./dto/auth.dto";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { JwtService } from "@nestjs/jwt";
import { genSalt, hash, compare } from "bcryptjs";
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from "./auth.constant";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel) private readonly userModel: ModelType<AuthModel>,
    private readonly jwtService: JwtService,
  ) {}

  // Необходимо добавить хэширование
  async registerUser(dto: AuthDto) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      name: dto.name || "",
      phone: dto.phone || "",
      dataofBirt: dto.dataofBirt || "",
      role: "user",
      email: dto.email,
      passwordHash: await hash(dto.password, salt),
    });
    return newUser.save();
  }

    async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<AuthModel, "email">> {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
