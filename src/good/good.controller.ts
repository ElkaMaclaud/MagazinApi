import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { GoodDto } from "./dto/find-goods.dto";
import { GoodService } from "./good.service";

@Controller("good")
export class GoodController {
  constructor(private readonly goodService: GoodService) {}

  @Get("getGoodsByCategory")
  async getGoodsByCategory(@Body() dto: Pick<GoodDto, "category">) {
    return this.goodService.getGoodsByCategory(dto)
  }

  @Get(":id")
  async getGoodById(@Param("id") id: string) {
    return this.goodService.getGoodById(id);
  }
}
