import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ReviewDto } from "./dto/review.dto";

@Controller("review")
export class ReviewController {
  @Post("create")
  async create(@Body dto: ReviewDto) {}

  @Get(":id")
  async(@Param("id") id: string) {
	
  }
}
