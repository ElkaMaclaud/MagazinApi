/// <reference types="mongoose" />
import { IDelivery, IInfoPrivate, UserModel } from "./user.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./dto/auth.dto";
export declare class UserService {
    private readonly userModel;
    private readonly jwtService;
    constructor(userModel: ModelType<UserModel>, jwtService: JwtService);
    registerUser(dto: AuthDto, registered?: boolean): Promise<import("mongoose").Document>;
    findUser(email: string): Promise<import("@typegoose/typegoose/lib/types").DocumentType<UserModel>>;
    validateUser(email: string, password: string): Promise<Pick<IInfoPrivate, "email">>;
    login(email: string): Promise<{
        access_token: string;
    }>;
    getData(email: string, field: string, options: any): Promise<any>;
    getBasket(email: string, options: any): Promise<any>;
    getFavorites(email: string, options: any): Promise<any>;
    getOrders(email: string, options: any): Promise<any>;
    getUserData(email: string): Promise<import("@typegoose/typegoose/lib/types").DocumentType<UserModel>>;
    updateUserData(dto: {
        name: string;
        phone: string;
    }, email: string): Promise<{
        phone: string;
        name: string;
    }>;
    updateDelivery(dto: IDelivery, email: string): Promise<IDelivery>;
    updateGoodToBasket(email: string, goodId: string, operand?: string, token?: string): Promise<any>;
    deleteGood(email: string, id: string, field: string): Promise<{
        id: string;
    }>;
    addBasket(id: string, email?: string): Promise<any>;
    toggleChoice(email: string, goodId: string): Promise<import("./user.model").IUserGood>;
    ChooseAll(email: string, on: boolean): Promise<import("./user.model").IUserGood[]>;
    toggleFavorites(goodId: string, email?: string): Promise<any>;
    toggleFavoritesByEmail(goodId: string, email?: string, token?: string): Promise<any>;
    addOrder(email: string, ids: string[]): Promise<string[]>;
    subBasket(email: string, id: string): Promise<any>;
    deleteSelected(email: string): Promise<import("./user.model").IUserGood[]>;
    deleteBasket(email: string, id: string): Promise<{
        id: string;
    }>;
}
