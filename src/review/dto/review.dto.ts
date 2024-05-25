import { Types } from "mongoose";

export class ReviewDto {
  name: string;
  title: string;
  description: string;
  rating: number;
  goodId: string;
}
