import { prop } from "@typegoose/typegoose";

export class AuthDto {
  @prop()
  name?: string;

  @prop()
  email: string;

  @prop()
  phone?: string;

  @prop()
  dateofBirth?: string;

  @prop()
  password: string;

  @prop()
  role?: "admin" | "user";

  @prop()
  typegooseName?: string;  
}
