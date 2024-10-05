/// <reference types="mongoose" />
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { AuthDto } from "./dto/auth.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(dto: AuthDto): Promise<import("mongoose").Document>;
    login({ email: login, password }: AuthDto): Promise<{
        access_token: string;
    }>;
    getBasket(req: any, email: string): Promise<any>;
    getFavorites(req: any, email: string): Promise<any>;
    getOrders(req: any, email: string): Promise<any>;
    ChooseAll(req: any, dto: {
        on: boolean;
    }, email: string): Promise<any>;
    getUserData(id: string): Promise<import("@typegoose/typegoose").DocumentType<import("./user.model").UserModel>>;
    updateUserData(dto: UserDto, id: string): Promise<import("@typegoose/typegoose").DocumentType<import("./user.model").UserModel>>;
    deleteSelected(req: any, email: string): Promise<any>;
    addBasket(req: any, id: string, email: string): Promise<any>;
    toggleChoice(req: any, id: string, email: string): Promise<any>;
    addFavorites(req: any, id: string, email: string): Promise<any>;
    addOrder(req: any, id: string, email: string): Promise<any>;
    subBasket(req: any, id: string, email: string): Promise<any>;
    deleteBasket(req: any, id: string, email: string): Promise<any>;
}
