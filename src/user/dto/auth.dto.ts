import { prop } from "@typegoose/typegoose";

export class AuthDto {
  @prop()
  name?: string;

  @prop()
  email: string;

  @prop()
  phone?: number;

  @prop()
  dataofBirth?: Date;

  @prop()
  password: string;

  @prop()
  role?: "admin" | "user";
}
