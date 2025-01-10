import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"

export type MessengeDocument = MessengeModel & Document;

@Schema({ timestamps: true })
export class MessengeModel extends TimeStamps {
  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  senderId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Chat', required: true })
  chatId: MongooseSchema.Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;

  @Prop({ type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' })
  status: string;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'User' })
  readBy: MongooseSchema.Types.ObjectId[];
}

export const MessengeSchema = SchemaFactory.createForClass(MessengeModel);