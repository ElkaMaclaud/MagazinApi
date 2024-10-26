import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
export declare class IUserGood {
    goodId: string;
    count: number;
    favorite?: boolean;
    choice?: boolean;
}
export declare class IInfoPublik {
    name: string;
    city: string;
    age?: number;
}
export declare class IInfoPrivate {
    phone?: string;
    dateOfBirth?: Date;
    email: string;
    gender?: "Ж" | "М";
    passwordHash: string;
    role: "admin" | "user";
}
export declare class IDelivery {
    address?: string;
    pickUpPoin: string;
    choice: "address" | "pickUpPoin";
}
export interface UserModel extends Base {
}
export declare class UserModel extends TimeStamps {
    publik: IInfoPublik;
    privates: IInfoPrivate;
    favorites?: string[];
    basket?: IUserGood[];
    order?: string[];
    delivery: IDelivery;
    typegooseName: string;
}
