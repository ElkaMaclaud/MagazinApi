import { Body, Controller, Get, Param } from "@nestjs/common";
import { GoodDiscount, GoodDto, GoodIdsDto } from "./dto/find-goods.dto";
import { GoodService } from "./good.service";

@Controller("good")
export class GoodController {
  constructor(private readonly goodService: GoodService) {}

  @Get("goodsByCategory")
  async getGoodsByCategory(@Body() dto: Pick<GoodDto, "category">) {
    return this.goodService.getGoodsByCategory(dto);
  }

  // Этот метод нужен будет для получения определенных товаров (н-р по распродаже и т.д.)
  @Get("goodsbyIds")
  async goodsbyIds(@Body() dto: GoodIdsDto) {
    return this.goodService.getGoodsByIds(dto);
  }

  @Get("goodsbySale")
  async goodsbySale(@Body() dto: GoodDiscount) {
    return this.goodService.getGoodsByDiscountСlassification(dto);
  }

  @Get("goodsbyDiscount")
  async goodsbyDiscount(@Body() dto: GoodDiscount) {
    return this.goodService.getGoodsByDiscountСlassification(dto);
  }

  @Get(":id")
  async getGoodById(@Param("id") id: string) {
    return this.goodService.getGoodById(id);
  }

  // Специальный метод жизненного цикла nestjs - инициализирует самозапускающуюся ф-ую

  // async onModuleInit() {
  //   await this.goodService.writeDataToBD();
  // }
}
