import { ReviewModel } from "./review.model";
import { DocumentType, ModelType } from "@typegoose/typegoose/lib/types";
import { ReviewDto } from "./dto/review.dto";
export declare class ReviewService {
    private readonly reviewModel;
    constructor(reviewModel: ModelType<ReviewModel>);
    create(dto: ReviewDto): Promise<DocumentType<ReviewModel>>;
    delete(id: string): Promise<DocumentType<ReviewModel> | null>;
    findByGoodId(goodId: string): Promise<DocumentType<ReviewModel>[]>;
    deleteByGoodId(goodId: string): Promise<import("mongodb").DeleteResult>;
}
