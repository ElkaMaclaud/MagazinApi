import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Patch,
  Post,
  Req,
} from "@nestjs/common";
import { IUserGood } from "./user.model";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { AuthDto } from "./dto/auth.dto";
import { ACCES_TOKEN_VERIFY_ERROR, ALREADY_REGISTERED_ERROR } from "./user.constant";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtAuthGuard } from "./guards/jwt.guard";


@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async authMiddleware(req: Request) {
    const accessToken = req.headers["authorization"].split(" ")[1];
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

  @Post("auth/register")
  async register(@Body() dto: AuthDto) {
    const user = await this.userService.findUser(dto.email);
    if (user) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }
    return this.userService.registerUser(dto);
  }

  @HttpCode(200)
  @Post("auth/login")
  async login(@Body() { email: login, password }: AuthDto) {
    const { email } = await this.userService.validateUser(login, password);
    return this.userService.login(email);
  }

  // @UseGuards(JwtAuthGuard)
  @Get("basket")
  async getBasket(@Req() req) {
    const email = await this.authMiddleware(req);
    return this.userService.getBasket(email);
  }

  @Get("favorites")
  async getFavorites(@Req() req) {
    const email = await this.authMiddleware(req);
    return this.userService.getFavorites(email);
  }

  @Get("orders")
  async getOrders(@Req() req) {
    const email = await this.authMiddleware(req);
    return this.userService.getOrders(email);
  }

  @Get("userData")
  async getUserData(id: string) {
    return this.userService.getUserData(id);
  }

  @Patch("updateUserData")
  async updateUserData(@Body() dto: UserDto, id: string) {
    const result = this.userService.updateUserData(dto, id);
    return result;
  }

  @Patch("addBasket")
  async addBasket(@Req() req, @Body() dto: IUserGood) {
    const email = await this.authMiddleware(req);
    return this.userService.addBasket(email, dto);
  }

  @Patch("addFavorites")
  async addFavorites(@Req() req, @Body() dto: IUserGood) {
    const email = await this.authMiddleware(req);
    return this.userService.addFavorites(email, dto);
  }

  @Patch("buy")
  async addOrder(@Req() req, @Body() dto: IUserGood) {
    const email = await this.authMiddleware(req);
    return this.userService.addOrder(email, dto);
  }

  // @Patch("buy")
  // async buy(@Body() dto: IUserGood) {}

  @Patch("deleteBasket")
  async deleteBasket(id: string, goodId: string) {
    const result = this.userService.deleteBasket(id, goodId);
    return result;
  }

  @Patch("deleteFavorites")
  async deleteFavorites(id: string, goodId: string) {
    const result = this.userService.deleteFavorites(id, goodId);
    return result;
  }
}
