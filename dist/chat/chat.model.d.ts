import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Document } from 'mongoose';
export type ChatDocument = Chat & Document;
export interface Chat extends Base {
}
export declare class Chat extends TimeStamps {
    participants: {
        userId: string;
        title: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}
