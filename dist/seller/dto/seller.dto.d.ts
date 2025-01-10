import { Types } from "mongoose";
export interface SellerDto {
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
    products: Types.ObjectId[];
    status: string;
    socialMediaLinks: Map<string, string>;
    image: string;
    chats: Types.ObjectId[];
    typegooseName: string;
}
