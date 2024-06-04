export class UserDto {
  publik: IInfoPublik;
  private: IInfoPrivate;
  favorite?: IUserGood[];
  basket?: IUserGood[];
  order?: string[];
  delivery: IDelivery;
}

export interface IUserGood {
  goodId: string;
  count: number;
  favorite?: boolean;
  choice?: boolean;
}

export interface IInfoPublik {
  name: string;
  city: string;
  age?: number;
}
export interface IInfoPrivate extends IInfoPublik {
  phone?: string;
  dateOfBirt?: Date;
  email: string;
  gender?: "Ж" | "М";
}
export interface IDelivery {
  address?: string;
  pickUpPoin: string;
  choice: "address" | "pickUpPoin";
}

