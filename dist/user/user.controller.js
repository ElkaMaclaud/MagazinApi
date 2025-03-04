"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const auth_dto_1 = require("./dto/auth.dto");
const user_constant_1 = require("./user.constant");
const jwt_guard_1 = require("./guards/jwt.guard");
const user_email_decorator_1 = require("../decorators/user-email.decorator");
const user_model_1 = require("./user.model");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async register(dto) {
        const user = await this.userService.findUser(dto.email);
        if (user) {
            throw new common_1.BadRequestException(user_constant_1.ALREADY_REGISTERED_ERROR);
        }
        return this.userService.registerUser(dto);
    }
    async login({ email: login, password }) {
        const { email } = await this.userService.validateUser(login, password);
        return this.userService.login(email);
    }
    async getCart(email, offset, limit) {
        const options = { offset, limit };
        return this.userService.getCart(email, options);
    }
    async getFavorites(email, offset, limit) {
        const options = { offset, limit };
        return this.userService.getFavorites(email, options);
    }
    async getOrders(email, offset, limit) {
        const options = { offset, limit };
        return this.userService.getOrders(email, options);
    }
    async selectAll(dto, email) {
        return this.userService.selectAll(email, dto.on);
    }
    async getAllChats(email) {
        return this.userService.getAllChats(email);
    }
    async createNewChat(dto, email) {
        return this.userService.createNewChat(dto);
    }
    async getUserData(email) {
        return this.userService.getUserData(email);
    }
    async updateUserData(dto, email) {
        const result = this.userService.updateUserData(dto, email);
        return result;
    }
    async updateDelivery(dto, email) {
        const result = this.userService.updateDelivery(dto, email);
        return result;
    }
    async deleteSelected(email) {
        const result = this.userService.deleteSelected(email);
        return result;
    }
    async addToCart(dto, email) {
        const id = dto.id;
        return this.userService.addToCart(id, email);
    }
    async addToCartGetAuto(dto) {
        const id = dto.id;
        return this.userService.addToCart(id);
    }
    async toggleSelect(dto, email) {
        const id = dto.id;
        return this.userService.toggleSelect(email, id);
    }
    async addFavorites(dto, email) {
        const id = dto.id;
        return this.userService.toggleFavorites(id, email);
    }
    async toggleFavoritesGetAuto(dto) {
        const id = dto.id;
        return this.userService.toggleFavorites(id);
    }
    async addOrder(dto, email) {
        return this.userService.addOrder(email, dto.ids);
    }
    async subFromCart(dto, email) {
        const id = dto.id;
        return this.userService.subFromCart(email, id);
    }
    async removeFromCart(dto, email) {
        const id = dto.id;
        const result = this.userService.removeFromCart(email, id);
        return result;
    }
};
__decorate([
    (0, common_1.Post)("auth/register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("auth/login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("cart"),
    __param(0, (0, user_email_decorator_1.UserEmail)()),
    __param(1, (0, common_1.Query)("offset")),
    __param(2, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCart", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("favorites"),
    __param(0, (0, user_email_decorator_1.UserEmail)()),
    __param(1, (0, common_1.Query)("offset")),
    __param(2, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFavorites", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("orders"),
    __param(0, (0, user_email_decorator_1.UserEmail)()),
    __param(1, (0, common_1.Query)("offset")),
    __param(2, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOrders", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("selectAll"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "selectAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("getAllChats"),
    __param(0, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllChats", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("createNewChat"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createNewChat", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("userData"),
    __param(0, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserData", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("updateUserData"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserData", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("changeDelivery"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.IDelivery, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateDelivery", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)("deleteSelected"),
    __param(0, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteSelected", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("cart"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Patch)("addToCartGetAuto"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addToCartGetAuto", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("toggleSelect"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "toggleSelect", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("toggleFavorites"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addFavorites", null);
__decorate([
    (0, common_1.Patch)("toggleFavoritesGetAuto"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "toggleFavoritesGetAuto", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("buy"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addOrder", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("subFromCart"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "subFromCart", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("removeFromCart"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removeFromCart", null);
UserController = __decorate([
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map