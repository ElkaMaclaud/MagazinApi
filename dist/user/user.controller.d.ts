/// <reference types="mongoose" />
import { UserService } from "./user.service";
import { AuthDto } from "./dto/auth.dto";
import { IDelivery } from "./user.model";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(dto: AuthDto): Promise<import("mongoose").Document>;
    login({ email: login, password }: AuthDto): Promise<{
        access_token: string;
    }>;
    getCart(req: any, email: string, offset?: number, limit?: number): Promise<any>;
    getFavorites(req: any, email: string, offset?: number, limit?: number): Promise<any>;
    getOrders(req: any, email: string, offset?: number, limit?: number): Promise<any>;
    selectAll(req: any, dto: {
        on: boolean;
    }, email: string): Promise<import("./user.model").IUserGood[]>;
    getUserData(email: string): Promise<import("@typegoose/typegoose").DocumentType<import("./user.model").UserModel>>;
    updateUserData(dto: {
        name: string;
        phone: string;
    }, email: string): Promise<{
        phone: string;
        name: string;
    }>;
    updateDelivery(dto: IDelivery, email: string): Promise<IDelivery>;
    deleteSelected(req: any, email: string): Promise<import("./user.model").IUserGood[]>;
    addToCart(req: any, dto: {
        id: string;
    }, email: string): Promise<any>;
    addToCartGetAuto(req: any, dto: {
        id: string;
    }): Promise<any>;
    toggleSelect(req: any, dto: {
        id: string;
    }, email: string): Promise<import("./user.model").IUserGood>;
    addFavorites(req: any, dto: {
        id: string;
    }, email: string): Promise<any>;
    toggleFavoritesGetAuto(req: any, dto: {
        id: string;
    }): Promise<any>;
    addOrder(req: any, dto: {
        ids: string[];
    }, email: string): Promise<string[]>;
    subFromCart(req: any, dto: {
        id: string;
    }, email: string): Promise<any>;
    removeFromCart(req: any, dto: {
        id: string;
    }, email: string): Promise<{
        id: string;
    }>;
}
