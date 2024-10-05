import { Types } from "mongoose";
export declare class ReviewDto {
    name: string;
    title: string;
    description: string;
    rating: number;
    productId: string;
    goodId: Types.ObjectId;
    typegooseName: string;
}
