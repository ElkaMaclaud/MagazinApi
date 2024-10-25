import { UserService } from "./user.service";
import { AuthDto } from "./dto/auth.dto";
import { IDelivery } from "./user.model";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(dto: AuthDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./user.model").UserModel> & Omit<import("./user.model").UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v?: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    login({ email: login, password }: AuthDto): Promise<{
        access_token: string;
    }>;
    getBasket(req: any, email: string, offset?: number, limit?: number): Promise<any>;
    getFavorites(req: any, email: string, offset?: number, limit?: number): Promise<any>;
    getOrders(req: any, email: string, offset?: number, limit?: number): Promise<any>;
    ChooseAll(req: any, dto: {
        on: boolean;
    }, email: string): Promise<import("./user.model").IUserGood[]>;
    getUserData(email: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./user.model").UserModel> & Omit<import("./user.model").UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v?: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    updateUserData(dto: {
        name: string;
        phone: string;
    }, email: string): Promise<{
        phone: string;
        name: string;
    }>;
    updateDelivery(dto: IDelivery, email: string): Promise<IDelivery>;
    deleteSelected(req: any, email: string): Promise<import("./user.model").IUserGood[]>;
    addBasket(req: any, dto: {
        id: string;
    }, email: string): Promise<any>;
    toggleChoice(req: any, dto: {
        id: string;
    }, email: string): Promise<import("./user.model").IUserGood>;
    addFavorites(req: any, dto: {
        id: string;
    }, email: string): Promise<any>;
    addOrder(req: any, dto: {
        ids: string[];
    }, email: string): Promise<string[]>;
    subBasket(req: any, dto: {
        id: string;
    }, email: string): Promise<any>;
    deleteBasket(req: any, dto: {
        id: string;
    }, email: string): Promise<{
        id: string;
    }>;
}
