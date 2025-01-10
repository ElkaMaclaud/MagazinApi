import { IDelivery, IInfoPrivate, UserModel } from "./user.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./dto/auth.dto";
import { Chat } from "source/chat/chat.model";
export declare class UserService {
    private readonly userModel;
    private readonly chatModel;
    private readonly jwtService;
    constructor(userModel: ModelType<UserModel>, chatModel: ModelType<Chat>, jwtService: JwtService);
    registerUser(dto: AuthDto, registered?: boolean): Promise<any>;
    findUser(email: string): Promise<any>;
    validateUser(email: string, password: string): Promise<Pick<IInfoPrivate, "email">>;
    login(email: string): Promise<{
        access_token: string;
    }>;
    getData(email: string, field: string, options: any): Promise<any>;
    getCart(email: string, options: any): Promise<any>;
    getFavorites(email: string, options: any): Promise<any>;
    getOrders(email: string, options: any): Promise<any>;
    getAllChats(email: string): Promise<any>;
    getUserData(email: string): Promise<any>;
    createNewChat(dto: any): Promise<{
        chats: any;
    }>;
    updateUserData(dto: {
        name: string;
        phone: string;
    }, email: string): Promise<{
        phone: any;
        name: any;
    }>;
    updateDelivery(dto: IDelivery, email: string): Promise<any>;
    updateGoodTocart(email: string, goodId: string, operand?: string, token?: string): Promise<any>;
    deleteGood(email: string, id: string, field: string): Promise<{
        id: string;
    }>;
    addToCart(id: string, email?: string): Promise<any>;
    toggleSelect(email: string, goodId: string): Promise<any>;
    selectAll(email: string, on: boolean): Promise<any>;
    toggleFavorites(goodId: string, email?: string): Promise<any>;
    toggleFavoritesByEmail(goodId: string, email?: string, token?: string): Promise<any>;
    addOrder(email: string, ids: string[]): Promise<any>;
    subFromCart(email: string, id: string): Promise<any>;
    deleteSelected(email: string): Promise<any>;
    removeFromCart(email: string, id: string): Promise<{
        id: string;
    }>;
}
