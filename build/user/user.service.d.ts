/// <reference types="mongoose" />
import { IInfoPrivate, UserModel } from "./user.model";
import { UserDto } from "./dto/user.dto";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./dto/auth.dto";
export declare class UserService {
    private readonly userModel;
    private readonly jwtService;
    constructor(userModel: ModelType<UserModel>, jwtService: JwtService);
    registerUser(dto: AuthDto): Promise<import("mongoose").Document>;
    findUser(email: string): Promise<import("@typegoose/typegoose/lib/types").DocumentType<UserModel>>;
    validateUser(email: string, password: string): Promise<Pick<IInfoPrivate, "email">>;
    login(email: string): Promise<{
        access_token: string;
    }>;
    getData(email: string, field: string): Promise<any>;
    getBasket(email: string): Promise<any>;
    getFavorites(email: string): Promise<any>;
    getOrders(email: string): Promise<any>;
    getUserData(id: string): Promise<import("@typegoose/typegoose/lib/types").DocumentType<UserModel>>;
    updateUserData(dto: UserDto, id: string): Promise<import("@typegoose/typegoose/lib/types").DocumentType<UserModel>>;
    updateGoodToBasket(email: string, goodId: string, operand?: string): Promise<any>;
    deleteGood(email: string, id: string, field: string): Promise<any>;
    addBasket(email: string, id: string): Promise<any>;
    toggleChoice(email: string, goodId: string): Promise<any>;
    ChooseAll(email: string, on: boolean): Promise<any>;
    toggleFavorites(email: string, goodId: string): Promise<any>;
    addOrder(email: string, id: string): Promise<any>;
    subBasket(email: string, id: string): Promise<any>;
    deleteSelected(email: string): Promise<any>;
    deleteBasket(email: string, id: string): Promise<any>;
}
