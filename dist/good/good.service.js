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
exports.GoodService = void 0;
const common_1 = require("@nestjs/common");
const good_model_1 = require("./good.model");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let GoodService = class GoodService {
    constructor(goodModel) {
        this.goodModel = goodModel;
    }
    async getGoodsByCategory(dto) {
        return this.goodModel.find({ category: { $in: dto.category } }).exec();
    }
    async getGoodsByIds(dto) {
        return this.goodModel.find({ _id: { $in: dto.ids } }).exec();
    }
    async getGoodsByDiscountСlassification(dto) {
        return this.goodModel.find({ [dto.field]: { $exists: true } }).exec();
    }
    async getGoodById(id) {
        return this.goodModel.findById(id).exec();
    }
    async getGoodByIdForUser(id, email) {
        const result = await this.goodModel
            .aggregate([
            {
                $match: { $expr: { $eq: [{ $toString: "$_id" }, id] } },
            },
            {
                $lookup: {
                    from: "User",
                    let: { userEmail: email, goodId: id },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$privates.email", "$$userEmail"] },
                            },
                        },
                        {
                            $addFields: {
                                basket_item: {
                                    $filter: {
                                        input: "$basket",
                                        as: "item",
                                        cond: { $eq: ["$$item.goodId", "$$goodId"] },
                                    },
                                },
                            },
                        },
                        {
                            $project: {
                                count: { $arrayElemAt: ["$basket_item.count", 0] },
                            },
                        },
                    ],
                    as: "user",
                },
            },
            {
                $addFields: {
                    count: {
                        $cond: {
                            if: { $gt: [{ $size: "$user" }, 0] },
                            then: { $arrayElemAt: ["$user.count", 0] },
                            else: 0,
                        },
                    },
                    favorite: {
                        $cond: {
                            if: {
                                $in: [
                                    id,
                                    [
                                        {
                                            $arrayElemAt: ["$user.favorites", 0],
                                        },
                                    ],
                                ],
                            },
                            then: true,
                            else: false,
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: "Review",
                    let: { goodId: { $toString: "$_id" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$$goodId", "$goodId"] },
                            },
                        },
                    ],
                    as: "reviews",
                },
            },
            {
                $addFields: {
                    reviewCount: { $size: "$reviews" },
                    reviewAvg: { $avg: "$reviews.rating" },
                },
            },
            {
                $project: {
                    user: 0,
                },
            },
        ])
            .exec();
        return result[0];
    }
};
exports.GoodService = GoodService;
exports.GoodService = GoodService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(good_model_1.GoodModel)),
    __metadata("design:paramtypes", [Object])
], GoodService);
//# sourceMappingURL=good.service.js.map