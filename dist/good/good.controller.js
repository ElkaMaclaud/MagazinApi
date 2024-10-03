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
const user_email_decorator_1 = require("../decorators/user-email.decorator");
let GoodController = class GoodController {
    constructor(goodService) {
        this.goodService = goodService;
    }
    async getGoodById(id, req, email) {
        if (!email) {
            return this.goodService.getGoodById(id);
        }
        return this.goodService.getGoodByIdForUser(id, email);
    }
    async getGoodsByCategory(dto) {
        return this.goodService.getGoodsByCategory(dto);
    }
    async goodsbyIds(dto) {
        return this.goodService.getGoodsByIds(dto);
    }
    async goodsbySale(dto) {
        return this.goodService.getGoodsByDiscountСlassification(dto);
    }
    async goodsbyDiscount(dto) {
        return this.goodService.getGoodsByDiscountСlassification(dto);
    }
};
exports.GoodController = GoodController;
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], GoodController.prototype, "getGoodById", null);
__decorate([
    (0, common_1.Post)("goodsByCategory"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoodController.prototype, "getGoodsByCategory", null);
__decorate([
    (0, common_1.Post)("goodsbyIds"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_goods_dto_1.GoodIdsDto]),
    __metadata("design:returntype", Promise)
], GoodController.prototype, "goodsbyIds", null);
__decorate([
    (0, common_1.Post)("goodsbySale"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_goods_dto_1.GoodDiscount]),
    __metadata("design:returntype", Promise)
], GoodController.prototype, "goodsbySale", null);
__decorate([
    (0, common_1.Post)("goodsbyDiscount"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_goods_dto_1.GoodDiscount]),
    __metadata("design:returntype", Promise)
], GoodController.prototype, "goodsbyDiscount", null);
exports.GoodController = GoodController = __decorate([
    (0, common_1.Controller)("good"),
    __metadata("design:paramtypes", [good_service_1.GoodService])
], GoodController);
//# sourceMappingURL=good.controller.js.map