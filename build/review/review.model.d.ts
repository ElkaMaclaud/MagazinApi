import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";
export interface ReviewModel extends Base {
}
export declare class ReviewModel extends TimeStamps {
    name: string;
    title: string;
    description: string;
    rating: number;
    goodId: Types.ObjectId;
}
