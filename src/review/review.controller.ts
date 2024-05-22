import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ReviewDto } from "./dto/review.dto";

@Controller("review")
export class ReviewController {
  @HttpCode(200)
  @Post("create")
  async create(@Body() dto: ReviewDto) {}

  @Get(":id")
  async get(@Param("id") id: string) {}

  @Delete(":id")
  async delete(@Param("id") id: string) {}

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: ReviewDto) {}
}
