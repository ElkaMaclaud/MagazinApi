import { Inject, Injectable } from "@nestjs/common";
import { ReviewModel } from "./review.model";
import { ModelType } from "@typegoose/typegoose/lib/types";

@Injectable()
export class ReviewService {
  constructor(
    @Inject(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>,
  ) {}
}
