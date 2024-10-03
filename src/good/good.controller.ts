import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { GoodDto, GoodIdsDto } from "./dto/find-goods.dto";
import { GoodService } from "./good.service";
import { UserEmail } from "src/decorators/user-email.decorator";

@Controller("good")
export class GoodController {
  constructor(
    private readonly goodService: GoodService,
  ) {}
  @Get("goodsbySale")
  async goodsbySale() {
    return this.goodService.getGoodsByDiscountСlassification("sale");
  }
  @Get("goodsbyDiscount")
  async goodsbyDiscount() {
    return this.goodService.getGoodsByDiscountСlassification("discount");
  }
  @Get(":id")
  async getGoodById(@Param("id") id: string, @Req() req, @UserEmail() email: string) {
     if (!email) {
       return this.goodService.getGoodById(id);
     }

    return this.goodService.getGoodByIdForUser(id, email);
  } 
  
  @Post("goodsByCategory")
  async getGoodsByCategory(@Body() dto: Pick<GoodDto, "category">) {
    return this.goodService.getGoodsByCategory(dto);
  }
  // Этот метод нужен будет для получения определенных товаров (н-р по распродаже и т.д.)
  @Post("goodsbyIds")
  async goodsbyIds(@Body() dto: GoodIdsDto) {
    return this.goodService.getGoodsByIds(dto);
  }

  // Специальный метод жизненного цикла nestjs - инициализирует самозапускающуюся ф-ую

  // async onModuleInit() {
  //   await this.goodService.writeDataToBD();
  // }
}
