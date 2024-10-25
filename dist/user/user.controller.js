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
    async getBasket(req, email, offset, limit) {
        const options = { offset, limit };
        return this.userService.getBasket(email, options);
    }
    async getFavorites(req, email, offset, limit) {
        const options = { offset, limit };
        return this.userService.getFavorites(email, options);
    }
    async getOrders(req, email, offset, limit) {
        const options = { offset, limit };
        return this.userService.getOrders(email, options);
    }
    async ChooseAll(req, dto, email) {
        return this.userService.ChooseAll(email, dto.on);
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
    async deleteSelected(req, email) {
        const result = this.userService.deleteSelected(email);
        return result;
    }
    async addBasket(req, dto, email) {
        const id = dto.id;
        return this.userService.addBasket(email, id);
    }
    async toggleChoice(req, dto, email) {
        const id = dto.id;
        return this.userService.toggleChoice(email, id);
    }
    async addFavorites(req, dto, email) {
        const id = dto.id;
        return this.userService.toggleFavorites(email, id);
    }
    async addOrder(req, dto, email) {
        return this.userService.addOrder(email, dto.ids);
    }
    async subBasket(req, dto, email) {
        const id = dto.id;
        return this.userService.subBasket(email, id);
    }
    async deleteBasket(req, dto, email) {
        const id = dto.id;
        const result = this.userService.deleteBasket(email, id);
        return result;
    }
};
exports.UserController = UserController;
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
    (0, common_1.Get)("basket"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_email_decorator_1.UserEmail)()),
    __param(2, (0, common_1.Query)("offset")),
    __param(3, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getBasket", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("favorites"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_email_decorator_1.UserEmail)()),
    __param(2, (0, common_1.Query)("offset")),
    __param(3, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFavorites", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("orders"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_email_decorator_1.UserEmail)()),
    __param(2, (0, common_1.Query)("offset")),
    __param(3, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOrders", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("ChooseAll"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "ChooseAll", null);
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
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteSelected", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("addBasket"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addBasket", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("toggleChoice"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "toggleChoice", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("toggleFavorites"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addFavorites", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("buy"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addOrder", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("subBasket"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "subBasket", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("deleteBasket"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteBasket", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map