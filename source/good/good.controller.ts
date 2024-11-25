import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { GoodDto, GoodIdsDto, OptionsLimits } from "./dto/find-goods.dto";
import { GoodService } from "./good.service";
import { UserEmail } from "source/decorators/user-email.decoratorIfAuto";
import { JwtAuthGuard } from "./guards/jwtAuthGuard";

@Controller("good")
export class GoodController {
  constructor(private readonly goodService: GoodService) {}
  @Get("goodsbySale")
  @UseGuards(JwtAuthGuard)
  async goodsbySale(
    @Req() req,
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
  async getGoodFindByKeyword() {
    try {
        const email = req.userEmail;
        const keyWord = req.query.keyWord
        const offset = req.query.offset ? parseInt(req.query.offset) : undefined;
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const options = { offset, limit };
        if (!email) {
            const goods = await this.goodService.getGoodFindByKeyword(keyWord, options);
            return res.json(goods);
        }
        const goods = await this.goodService.getGoodsByDiscountСlassificationUser(email, { keyWord }, options);
        return res.json(goods);
    } catch (error) {
        return res.status(403).json({ success: false, message: error })
    }
  }
    async createSelers() {
      try {
          const dto = req.body
          await this.goodService.createSelers(dto)
          return res.json({ success: true, message: "Успешно!" })
      } catch (error) {
          return res.status(403).json({ success: false, message: error })
      }
  }
}


  // Специальный метод жизненного цикла nestjs - инициализирует самозапускающуюся ф-ую

  // async onModuleInit() {
  //   await this.goodService.writeDataToBD();
  // }
}
