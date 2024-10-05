import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
export class IUserGood {
  @prop()
  goodId: string;

  @prop()
  count: number;

  @prop()
  favorite?: boolean;

  @prop()
  choice: "address" | "pickUpPoin" | "";
}

export class IInfoPublik {
  @prop()
  name: string;

  @prop()
  city: string;

  @prop()
  age?: number;
}
export class IInfoPrivate {
  @prop()
  phone?: string;

  @prop()
  dateOfBirth?: Date;

  @prop()
  email: string;

  @prop()
  gender?: "Ж" | "М";

  @prop()
  passwordHash: string;

  @prop()
  role: "admin" | "user"
}
export class IDelivery {
  @prop()
  address?: string;

  @prop()
  pickUpPoin: string;

  @prop()
  choice: "address" | "pickUpPoin";
}

export interface UserModel extends Base {}
export class UserModel extends TimeStamps {
  @prop({ type: () => IInfoPublik })
  publik: IInfoPublik;

  @prop({ type: () => IInfoPrivate })
  privates: IInfoPrivate;

  @prop({ type: () => [String] })
  favorites?: string[];

  @prop({ type: () => [IUserGood] })
  basket?: IUserGood[];

  @prop({ type: () => [String] })
  order?: string[];

  @prop({ type: () => IDelivery })
  delivery: IDelivery;

  typegooseName: string;
}




