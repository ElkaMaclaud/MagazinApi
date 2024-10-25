import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
declare class GoodCharacteristic {
    name: string;
    value: string;
}
export interface GoodModel extends Base {
}
export declare class GoodModel extends TimeStamps {
    image: string[];
    price: number;
    oldPrice?: number;
    brand: string;
    name: string;
    description: string;
    category: string;
    characteristics: GoodCharacteristic[] | string;
    sale?: boolean;
    discount?: boolean;
}
export {};
