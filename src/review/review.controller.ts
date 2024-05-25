import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ReviewDto } from "./dto/review.dto";
import { ReviewService } from "./review.service";

@Controller("review")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @HttpCode(200)
  @Post("create")
  async create(@Body() dto: ReviewDto) {
    this.reviewService.create(dto);
  }

  @Get("byGood/:goodId")
  async get(@Param("goodId") goodId: string) {
    return this.reviewService.findByProductId(goodId);
  }

  @Delete(":id")
  async delete(id: string) {
    const deletedDoc = await this.reviewService.delete(id);
    if (!deletedDoc) {
      throw new HttpException("Такой отзыв не найден", HttpStatus.NOT_FOUND);
    }
  }
}
