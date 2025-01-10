import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
export type MessengeDocument = MessengeModel & Document;
export declare class MessengeModel extends TimeStamps {
    content: string;
    senderId: MongooseSchema.Types.ObjectId;
    chatId: MongooseSchema.Types.ObjectId;
    timestamp: Date;
    status: string;
    readBy: MongooseSchema.Types.ObjectId[];
}
export declare const MessengeSchema: mongoose.Schema<TClass>;
