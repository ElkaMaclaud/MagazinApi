import { Injectable } from "@nestjs/common";
import { ReviewModel } from "./review.model";
import { DocumentType, ModelType } from "@typegoose/typegoose/lib/types";
import { ReviewDto } from "./dto/review.dto";
import { InjectModel } from "nestjs-typegoose";
import { Types } from "mongoose";

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel)
    private readonly reviewModel: ModelType<ReviewModel>,
  ) {}

  async create(dto: ReviewDto): Promise<DocumentType<ReviewModel>> {
    return this.reviewModel.create(dto);
  }

  async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByGoodId(goodId: string): Promise<DocumentType<ReviewModel>[]> {
    return this.reviewModel.find({ goodId: new Types.ObjectId(goodId) }).exec();
  }

  async deleteByGoodId(goodId: string) {
    return this.reviewModel
      .deleteMany({ goodId: new Types.ObjectId(goodId) })
      .exec();
  }
}
