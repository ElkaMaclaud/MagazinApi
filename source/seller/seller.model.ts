import { Prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from 'mongoose';

export interface SellerModel extends Base {}
export class SellerModel extends TimeStamps {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    phone: string;

    @Prop()
    address: string;

    @Prop({ default: 0 })
    rating: number;

    @Prop([
        {
            text: String,
            rating: Number,
            createdAt: { type: Date, default: Date.now },
        },
    ])
    reviews: { text: string; rating: number; createdAt: Date }[];

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop([{ type: Types.ObjectId, ref: 'Good' }])
    products: Types.ObjectId[];

    @Prop({ enum: ['active', 'suspended', 'deleted'], default: 'active' })
    status: string;

    @Prop({ type: Map, of: String })
    socialMediaLinks: Map<string, string>;

    @Prop()
    image: string;

    @Prop([{ type: Types.ObjectId, ref: 'Chat' }])
    chats: Types.ObjectId[];
}