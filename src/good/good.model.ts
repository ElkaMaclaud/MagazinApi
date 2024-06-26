import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"

class GoodCharacteristic {
  @prop()
  name: string;

  @prop()
  value: string;
}

export interface GoodModel extends Base {}
export class GoodModel extends TimeStamps {
  @prop({ type: () => [String] })
  image: string[];

  @prop()
  price: number;

  @prop()
  oldPrice?: number;

  @prop()
  brand: string;

  @prop()
  name: string;

  @prop()
  description: string;

  @prop()
  category: string;

  @prop() //{ type: () => [GoodCharacteristic] | String, _id: false }
  characteristics: GoodCharacteristic[] | string;

  @prop()
  sale?: boolean;

  @prop()
  discount?: boolean;
}
