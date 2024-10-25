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
exports.GoodController = void 0;
const common_1 = require("@nestjs/common");
const find_goods_dto_1 = require("./dto/find-goods.dto");
const good_service_1 = require("./good.service");
const user_email_decoratorIfAuto_1 = require("../decorators/user-email.decoratorIfAuto");
const jwtAuthGuard_1 = require("./guards/jwtAuthGuard");
let GoodController = class GoodController {
    constructor(goodService) {
        this.goodService = goodService;
    }
    async goodsbySale(req, email, offset, limit) {
        const options = { offset, limit };
        if (!email) {
            return this.goodService.getGoodsByDiscountСlassification("sale", options);
        }
        return this.goodService.getGoodsByDiscountСlassificationUser(email, "sale", options);
    }
    async goodsbyDiscount(email, offset, limit) {
        const options = { offset, limit };
        if (!email) {
            return this.goodService.getGoodsByDiscountСlassification("discount", options);
        }
        return this.goodService.getGoodsByDiscountСlassificationUser(email, "discount", options);
    }
    async getGoodById(id, req, email) {
        if (!email) {
            return this.goodService.getGoodById(id);
        }
        return this.goodService.getGoodByIdForUser(id, email);
    }
    async getGoodsByCategory(dto, email) {
        const { category, ...options } = dto;
        const categotyObject = { category };
        if (!email) {
            return this.goodService.getGoodsByCategory(dto, options);
        }
        return this.goodService.getGoodsByDiscountСlassificationUser(email, categotyObject, options);
    }
    async goodsbyIds(dto, offset, limit) {
        const options = { offset, limit };
        return this.goodService.getGoodsByIds(dto, options);
    }
};
exports.GoodController = GoodController;
__decorate([
    (0, common_1.Get)("goodsbySale"),
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_email_decoratorIfAuto_1.UserEmail)()),
    __param(2, (0, common_1.Query)("offset")),
    __param(3, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number]),
    __metadata("design:returntype", Promise)
], GoodController.prototype, "goodsbySale", null);
__decorate([
    (0, common_1.Get)("goodsbyDiscount"),
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard),
    __param(0, (0, user_email_decoratorIfAuto_1.UserEmail)()),
    __param(1, (0, common_1.Query)("offset")),
    __param(2, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], GoodController.prototype, "goodsbyDiscount", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, user_email_decoratorIfAuto_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], GoodController.prototype, "getGoodById", null);
__decorate([
    (0, common_1.Post)("goodsByCategory"),
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_email_decoratorIfAuto_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GoodController.prototype, "getGoodsByCategory", null);
__decorate([
    (0, common_1.Post)("goodsbyIds"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)("offset")),
    __param(2, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_goods_dto_1.GoodIdsDto, Number, Number]),
    __metadata("design:returntype", Promise)
], GoodController.prototype, "goodsbyIds", null);
exports.GoodController = GoodController = __decorate([
    (0, common_1.Controller)("good"),
    __metadata("design:paramtypes", [good_service_1.GoodService])
], GoodController);
//# sourceMappingURL=good.controller.js.map