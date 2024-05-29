import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
} from "@nestjs/common";
import { Types } from "mongoose";
import { IUserGood } from "./user.model";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get("basket")
  async getBasket(id: Types.ObjectId) {}

  @Get("favorites")
  async getFavorites(id: Types.ObjectId) {}

  @Get("orders")
  async getOrders(id: Types.ObjectId) {}

  @Get("userData")
  async getUserData(id: Types.ObjectId) {}

  @Patch("addBasket")
  async addBasket(@Body() dto: IUserGood) {}

  @Patch("addFavorites")
  async addFavorites(@Body() dto: IUserGood, id: string) {
    const result = await this.userService.addFavorites(dto, id);
    return result;
  }

  @Patch("buy")
  async buy(@Body() dto: IUserGood) {}

  @Patch("updateUserData")
  async updateUserData(id: Types.ObjectId) {}

  @Patch ("deleteBasket")
  async deleteBasket(id: Types.ObjectId, goodId: string) {}

  @Patch ("deleteFavorites")
  async deleteFavorites(id: Types.ObjectId, goodId: string) {}
}
