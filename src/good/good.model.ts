export class GoodModel {
  image: string[];
  price: number;
  oldPrice: number;
  brand: string;
  name: string;
  description: string;
  category: string;
  characteristics: { [kewy: string]: string };
  typegooseName: string;
  sale?: boolean;
  discount?: boolean;
}
