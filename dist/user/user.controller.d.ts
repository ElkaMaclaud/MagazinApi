import { UserService } from "./user.service";
import { AuthDto } from "./dto/auth.dto";
import { IDelivery } from "./user.model";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(dto: AuthDto): Promise<any>;
    login({ email: login, password }: AuthDto): Promise<{
        access_token: string;
    }>;
    getCart(email: string, offset?: number, limit?: number): Promise<any>;
    getFavorites(email: string, offset?: number, limit?: number): Promise<any>;
    getOrders(email: string, offset?: number, limit?: number): Promise<any>;
    selectAll(dto: {
        on: boolean;
    }, email: string): Promise<any>;
    getAllChats(email: string): Promise<any>;
    createNewChat(dto: {
        userId: string;
        title: string;
    }, email: string): Promise<{
        chats: any;
    }>;
    getUserData(email: string): Promise<any>;
    updateUserData(dto: {
        name: string;
        phone: string;
    }, email: string): Promise<{
        phone: any;
        name: any;
    }>;
    updateDelivery(dto: IDelivery, email: string): Promise<any>;
    deleteSelected(email: string): Promise<any>;
    addToCart(dto: {
        id: string;
    }, email: string): Promise<any>;
    addToCartGetAuto(dto: {
        id: string;
    }): Promise<any>;
    toggleSelect(dto: {
        id: string;
    }, email: string): Promise<any>;
    addFavorites(dto: {
        id: string;
    }, email: string): Promise<any>;
    toggleFavoritesGetAuto(dto: {
        id: string;
    }): Promise<any>;
    addOrder(dto: {
        ids: string[];
    }, email: string): Promise<any>;
    subFromCart(dto: {
        id: string;
    }, email: string): Promise<any>;
    removeFromCart(dto: {
        id: string;
    }, email: string): Promise<{
        id: string;
    }>;
}
