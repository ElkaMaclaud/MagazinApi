import { IInfoPrivate, UserModel } from "./user.model";
import { UserDto } from "./dto/user.dto";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./dto/auth.dto";
export declare class UserService {
    private readonly userModel;
    private readonly jwtService;
    constructor(userModel: ModelType<UserModel>, jwtService: JwtService);
    registerUser(dto: AuthDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, UserModel> & Omit<UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v?: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    findUser(email: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, UserModel> & Omit<UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v?: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    validateUser(email: string, password: string): Promise<Pick<IInfoPrivate, "email">>;
    login(email: string): Promise<{
        access_token: string;
    }>;
    getData(email: string, field: string): Promise<any>;
    getBasket(email: string): Promise<any>;
    getFavorites(email: string): Promise<any>;
    getOrders(email: string): Promise<any>;
    getUserData(id: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, UserModel> & Omit<UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v?: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    updateUserData(dto: UserDto, id: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, UserModel> & Omit<UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v?: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    updateGoodToBasket(email: string, goodId: string, operand?: string): Promise<import("mongoose").UpdateWriteOpResult>;
    deleteGood(email: string, id: string, field: string): Promise<import("mongoose").UpdateWriteOpResult>;
    addBasket(email: string, id: string): Promise<import("mongoose").UpdateWriteOpResult>;
    toggleChoice(email: string, goodId: string): Promise<import("mongoose").UpdateWriteOpResult>;
    ChooseAll(email: string, on: boolean): Promise<import("mongoose").UpdateWriteOpResult>;
    toggleFavorites(email: string, goodId: string): Promise<import("mongoose").UpdateWriteOpResult>;
    addOrder(email: string, id: string): Promise<import("mongoose").UpdateWriteOpResult>;
    subBasket(email: string, id: string): Promise<import("mongoose").UpdateWriteOpResult>;
    deleteSelected(email: string): Promise<import("mongoose").UpdateWriteOpResult>;
    deleteBasket(email: string, id: string): Promise<import("mongoose").UpdateWriteOpResult>;
}
