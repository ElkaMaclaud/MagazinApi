import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from 'mongoose';
export interface SellerModel extends Base {
}
export declare class SellerModel extends TimeStamps {
    name: string;
    email: string;
    phone: string;
    address: string;
    rating: number;
    reviews: {
        text: string;
        rating: number;
        createdAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
    products: Types.ObjectId[];
    status: string;
    socialMediaLinks: Map<string, string>;
    image: string;
    chats: Types.ObjectId[];
}
