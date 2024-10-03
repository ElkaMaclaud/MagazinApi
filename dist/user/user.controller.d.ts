import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { AuthDto } from "./dto/auth.dto";
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
    getBasket(req: any, email: string): Promise<any>;
    getFavorites(req: any, email: string): Promise<any>;
    getOrders(req: any, email: string): Promise<any>;
    ChooseAll(req: any, dto: {
        on: boolean;
    }, email: string): Promise<import("mongoose").UpdateWriteOpResult>;
    getUserData(id: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./user.model").UserModel> & Omit<import("./user.model").UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v?: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    updateUserData(dto: UserDto, id: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./user.model").UserModel> & Omit<import("./user.model").UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v?: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    deleteSelected(req: any, email: string): Promise<import("mongoose").UpdateWriteOpResult>;
    addBasket(req: any, id: string, email: string): Promise<import("mongoose").UpdateWriteOpResult>;
    toggleChoice(req: any, id: string, email: string): Promise<import("mongoose").UpdateWriteOpResult>;
    addFavorites(req: any, id: string, email: string): Promise<import("mongoose").UpdateWriteOpResult>;
    addOrder(req: any, id: string, email: string): Promise<import("mongoose").UpdateWriteOpResult>;
    subBasket(req: any, id: string, email: string): Promise<import("mongoose").UpdateWriteOpResult>;
    deleteBasket(req: any, id: string, email: string): Promise<import("mongoose").UpdateWriteOpResult>;
}
