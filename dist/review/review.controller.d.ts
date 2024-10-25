import { ReviewDto } from "./dto/review.dto";
import { ReviewService } from "./review.service";
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    create(dto: ReviewDto): Promise<import("@typegoose/typegoose").DocumentType<import("./review.model").ReviewModel>>;
    get(goodId: string): Promise<import("@typegoose/typegoose").DocumentType<import("./review.model").ReviewModel>[]>;
    delete(id: string): Promise<void>;
}
