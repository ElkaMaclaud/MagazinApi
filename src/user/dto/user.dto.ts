export class UserDto {
  publik: IInfoPublik;
  privates: IInfoPrivate;
  favorite?: IUserGood[];
  basket?: IUserGood[];
  order?: string[];
  delivery: IDelivery;
  registered: boolean;
}

export interface IUserGood {
  goodId: string;
  count: number;
  favorite?: boolean;
  choice: "address" | "pickUpPoin";
}

export interface IInfoPublik {
  name: string;
  city: string;
  age?: number;
}
export interface IInfoPrivate {
  phone?: string;
  dateOfBirth?: Date;
  email: string;
  gender?: "Ж" | "М";
  role: "admin" | "user"

}
export interface IDelivery {
  address?: string;
  pickUpPoin: string;
  choice: "address" | "pickUpPoin";
}

