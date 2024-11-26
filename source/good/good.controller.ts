import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { GoodDto, GoodIdsDto, OptionsLimits } from "./dto/find-goods.dto";
import { GoodService } from "./good.service";
import { UserEmail } from "source/decorators/user-email.decoratorIfAuto";
import { JwtAuthGuard } from "./guards/jwtAuthGuard";

@Controller("good")
export class GoodController {
  constructor(private readonly goodService: GoodService) { }
  @Get("goodsbySale")
  @UseGuards(JwtAuthGuard)
  async goodsbySale(
    @UserEmail() email: string,
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
  ) {
    const options = { offset, limit };
    if (!email) {
      return this.goodService.getGoodsByDiscountСlassification("sale", options);
    }
    return this.goodService.getGoodsByDiscountСlassificationUser(
      email,
      "sale",
      options,
    );
  }
  @Get("goodsbyDiscount")
  @UseGuards(JwtAuthGuard)
  async goodsbyDiscount(
    @UserEmail() email: string,
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
  ) {
    const options = { offset, limit };
    if (!email) {
      return this.goodService.getGoodsByDiscountСlassification(
        "discount",
        options,
      );
    }
    return this.goodService.getGoodsByDiscountСlassificationUser(
      email,
      "discount",
      options,
    );
  }
  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getGoodById(
    @Param("id") id: string,
    @UserEmail() email: string,
  ) {
    if (!email) {
      return this.goodService.getGoodById(id);
    }
    return this.goodService.getGoodByIdForUser(id, email);
  }

  @Post("goodsByCategory")
  @UseGuards(JwtAuthGuard)
  async getGoodsByCategory(
    @Body() dto: Pick<GoodDto, "category"> & OptionsLimits,
    @UserEmail() email: string,
  ) {
    const { category, ...options } = dto;
    const categotyObject = { category };
    if (!email) {
      return this.goodService.getGoodsByCategory(dto, options);
    }
    return this.goodService.getGoodsByDiscountСlassificationUser(
      email,
      categotyObject,
      options,
    );
  }

  // Этот метод нужен будет для получения определенных товаров (н-р по распродаже и т.д.)
  @Post("goodsbyIds")
  // @UseGuards(JwtAuthGuard)
  async goodsbyIds(
    @Body() dto: GoodIdsDto,
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
  ) {
    const options = { offset, limit };
    return this.goodService.getGoodsByIds(dto, options);
  }

  @Get("getGoodFindByKeyword")
  async getGoodFindByKeyword(
    @UserEmail() email: string,
    @Query("keyWord") keyWord?: string,
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
  ) {
    const options = { offset, limit };
    if (!email) {
      return this.goodService.getGoodFindByKeyword(keyWord, options);
    }
    return this.goodService.getGoodsByDiscountСlassificationUser(email, { keyWord }, options);
  }


  // Специальный метод жизненного цикла nestjs - инициализирует самозапускающуюся ф-ую

  // async onModuleInit() {
  //   await this.goodService.writeDataToBD();
  // }
}
