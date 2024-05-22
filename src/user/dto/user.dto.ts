export class UserDto {
  publik: IInfoPublik;
  private: IInfoPrivate;
  favorite?: IUserGood[];
  basket?: IUserGood[];
  order?: string[];
  delivery: IDelivery;
}

interface IUserGood {
  productId: string;
  count: number;
  favorite?: boolean;
  choice?: boolean;
}

interface IInfoPublik {
  name: string;
  city: string;
  age?: number;
}
interface IInfoPrivate extends IInfoPublik {
  phone?: string;
  dateOfBirt?: Date;
  email: string;
  gender?: "Ж" | "М";
}
interface IDelivery {
  address?: string;
  pickUpPoin: string;
  choice: "address" | "pickUpPoin";
}
