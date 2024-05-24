import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";


class IUserGood {
  @prop()
  productId: string;

  @prop()
  count: number;

  @prop()
  favorite?: boolean;

  @prop()
  choice?: boolean;
}

class IInfoPublik {
  @prop()
  name: string;

  @prop()
  city: string;

  @prop()
  age?: number;
}
class IInfoPrivate extends IInfoPublik {
  @prop()
  phone?: string;

  @prop()
  dateOfBirt?: Date;

  @prop()
  email: string;

  @prop()
  gender?: "Ж" | "М";
}
class IDelivery {
  @prop()
  address?: string;

  @prop()
  pickUpPoin: string;

  @prop()
  choice: "address" | "pickUpPoin";
}

export interface UserModel extends Base {}
export class UserModel extends TimeStamps {
  @prop()
  publik: IInfoPublik;

  @prop()
  private: IInfoPrivate;

  @prop({ type: () => [IUserGood] })
  favorite?: IUserGood[];

  @prop({ type: () => [IUserGood] })
  basket?: IUserGood[];

  @prop({ type: () => [String] })
  order?: string[];

  @prop()
  delivery: IDelivery;
}


