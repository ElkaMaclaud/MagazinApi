import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { GoodDto, GoodIdsDto } from "./dto/find-goods.dto";
import { GoodService } from "./good.service";
import { UserEmail } from "src/decorators/user-email.decoratorIfAuto";
import { JwtAuthGuard } from "./guards/jwtAuthGuard";

@Controller("good")
export class GoodController {
  constructor(private readonly goodService: GoodService) {}
  @Get("goodsbySale")
  @UseGuards(JwtAuthGuard)
  async goodsbySale( @Req() req, @UserEmail() email: string,) {
    if (!email) {
      return this.goodService.getGoodsByDiscountСlassification("sale");
    }
    return this.goodService.getGoodsByDiscountСlassificationUser(email, "sale");
  }
  @Get("goodsbyDiscount")
  @UseGuards(JwtAuthGuard)
  async goodsbyDiscount( @UserEmail() email: string,) {
    if (!email) {
      return this.goodService.getGoodsByDiscountСlassification("discount");
    }
    return this.goodService.getGoodsByDiscountСlassificationUser(email, "discount");
  }
  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getGoodById(
    @Param("id") id: string,
    @Req() req,
    @UserEmail() email: string,
  ) {
    if (!email) {
      return this.goodService.getGoodById(id);
    }
    return this.goodService.getGoodByIdForUser(id, email);
  }

  @Post("goodsByCategory")
  @UseGuards(JwtAuthGuard)
  async getGoodsByCategory(@Body() dto: Pick<GoodDto, "category">,  @UserEmail() email: string,) {
    if (!email) {
      return this.goodService.getGoodsByCategory(dto);
    }
    return this.goodService.getGoodsByDiscountСlassificationUser(email, dto);
  }
  // Этот метод нужен будет для получения определенных товаров (н-р по распродаже и т.д.)
  @Post("goodsbyIds")
  // @UseGuards(JwtAuthGuard)
  async goodsbyIds(@Body() dto: GoodIdsDto) {
    return this.goodService.getGoodsByIds(dto);
  }

  // Специальный метод жизненного цикла nestjs - инициализирует самозапускающуюся ф-ую

  // async onModuleInit() {
  //   await this.goodService.writeDataToBD();
  // }
}
