import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
} from "@nestjs/common";
import { Types } from "mongoose";
import { IUserGood, UserModel } from "./user.model";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get("basket")
  async getBasket(id: string) {
    return this.userService.getBasket(id);
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

  @Patch("buy")
  async buy(@Body() dto: IUserGood) {}

  @Patch("updateUserData")
  async updateUserData(@Body() dto: UserDto, id: string) {
    const result = this.userService.updateUserData(dto, id);
    return result;
  }

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
