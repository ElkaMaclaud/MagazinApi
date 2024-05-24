import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface AuthModel extends Base {}
export class AuthModel extends TimeStamps {
  @prop()
  name?: string;

  @prop({ unique: true })
  email: string;

  @prop()
  phone?: number;

  @prop()
  dataofBirt?: Date;

  @prop()
  passwordHash: string;

  @prop()
  role?: "admin" | "user";
}
