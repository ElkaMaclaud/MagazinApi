import { Prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Document, Schema } from 'mongoose';

export type ChatDocument = Chat & Document;

export interface Chat extends Base {}
export class Chat extends TimeStamps {
  @Prop({ type: [{ userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, title: { type: String, required: true } }], required: true })
  participants: { userId: string; title: string }[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

// export const ChatSchema = SchemaFactory.createForClass(Chat);

// ChatSchema.pre('save', function (next) {
//   this.updatedAt = new Date();
//   next();
// });