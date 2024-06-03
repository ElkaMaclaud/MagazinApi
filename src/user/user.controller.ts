import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
} from "@nestjs/common";
import { IUserGood } from "./user.model";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { GoodIdsDto } from "src/good/dto/find-goods.dto";
import { GoodService } from "src/good/good.service";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly goodService: GoodService,
  ) {}

  @Post("basket")
  async createUser(dto: UserDto) {
    return this.userService.create(dto);
  }

  @Get("basket")
  async getBasket(@Body() dto: GoodIdsDto) {
    return this.goodService.getGoodsByUser(dto);
  }

  @Get("favorites")
  async getFavorites(@Body() dto: GoodIdsDto) {
    return this.goodService.getGoodsByUser(dto);
  }

  @Get("orders")
  async getOrders(@Body() dto: GoodIdsDto) {
    return this.goodService.getGoodsByUser(dto);
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
  async addBasket(@Body() dto: IUserGood, id: string) {
    const result = this.userService.addBasket(dto, id);
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
