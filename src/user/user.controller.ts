import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { ConfigService } from "@nestjs/config";
import { Types } from "mongoose";

@Controller("user")
export class UserController {
  constructor(private readonly configService: ConfigService) {}
  @Get("basket")
  async getBasket(id: Types.ObjectId) {}

  @Get("favorites")
  async getFavorites(id: Types.ObjectId) {}

  @Get("orders")
  async getOrders(id: Types.ObjectId) {}

  @Get("userData")
  async userData(id: Types.ObjectId) {}

  @Post("addBasket")
  async addBasket(id: Types.ObjectId, goodId: string) {}

  @Post("addFavorites")
  async addFavorites(id: Types.ObjectId, goodId: string) {}

  @Post("buy")
  async buy(id: Types.ObjectId, goodId: string) {}
}
