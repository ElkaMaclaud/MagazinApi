import { BadRequestException, Body, Controller, Get, HttpCode, Patch, Post } from "@nestjs/common";
import { IUserGood } from "./user.model";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { AuthDto } from "./dto/auth.dto";
import { ALREADY_REGISTERED_ERROR } from "./user.constant";
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
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

  @Post("basket")
  async createUser(dto: UserDto) {
    return this.userService.create(dto);
  }

  @Get("basket")
  async getBasket() {
    return this.userService.getBasket();
  }

  @Get("favorites")
  async getFavorites(id: string) {
    return this.userService.getFavorites(id);
  }

  @Get("orders")
  async getOrders(id: string) {
    return this.userService.getOrders(id);
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
  async addBasket(@Body() dto: IUserGood) {
    const result = this.userService.addBasket(dto);
    return result;
  }

  @Patch("addFavorites")
  async addFavorites(@Body() dto: IUserGood, id: string) {
    const result = await this.userService.addFavorites(dto, id);
    return result;
  }

  @Patch("buy")
  async addOrder(@Body() dto: IUserGood, id: string) {
    const result = this.userService.addOrder(dto, id);
    return result;
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
