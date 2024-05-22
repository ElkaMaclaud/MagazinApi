import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { GoodDto } from "./dto/find-goods.dto";

@Controller("good")
export class GoodController {
  @Post("getGoodsByCategory")
  async getGoodsByCategory(@Body() dto: Pick<GoodDto, "category">) {}

  @Get(":id")
  async get(@Param("id") id: string) {}
}
