import { prop } from "@typegoose/typegoose";

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
