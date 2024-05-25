import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class ReviewDto {
  @prop()
  name: string;

  @prop()
  title: string;

  @prop()
  description: string;

  @prop()
  rating: number;

  @prop()
  productId: string;
}
