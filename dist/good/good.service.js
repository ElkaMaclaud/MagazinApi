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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodService = void 0;
const common_1 = require("@nestjs/common");
const good_model_1 = require("./good.model");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let GoodService = class GoodService {
    constructor(goodModel) {
        this.goodModel = goodModel;
    }
    buildMatchCondition(value) {
        const matchCondition = {};
        if (typeof value === "string") {
            matchCondition[value] = { $exists: true };
        }
        else if (typeof value === "object") {
            const totalField = Object.keys(value);
            for (const key of totalField) {
                if (key === "category") {
                    matchCondition[key] = { [key]: { $in: [value[key]] } };
                }
                else if (key === "sort") {
                    matchCondition[key] = { [value[key]]: 1 };
                }
            }
        }
        return matchCondition;
    }
    buildMatchConditionByKeyword(keyword) {
        const searchQuery = {
            $or: [
                { brand: { $regex: keyword, $options: 'i' } },
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { category: { $regex: keyword, $options: 'i' } },
                { characteristics: { $regex: keyword, $options: 'i' } },
                { 'characteristics.name': { $regex: keyword, $options: 'i' } },
                { 'characteristics.value': { $regex: keyword, $options: 'i' } }
            ]
        };
        return searchQuery;
    }
    async getGoodsByDiscountСlassificationUser(email, value, options) {
        const offset = options?.offset || 0;
        const limit = options?.limit || 50;
        let query;
        const sortField = this.buildMatchCondition(value).sort || { price: 1 };
        if (typeof value === "object" && value.hasOwnProperty("keyWord")) {
            query = this.buildMatchConditionByKeyword(value.keyWord);
        }
        else {
            query =
                this.buildMatchCondition(value).category ||
                    this.buildMatchCondition(value);
        }
        return await this.goodModel
            .aggregate([
            {
                $match: query,
            },
            {
                $lookup: {
                    from: "User",
                    let: { userEmail: email },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$privates.email", "$$userEmail"] },
                            },
                        },
                    ],
                    as: "user",
                },
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $addFields: {
                    user: { $ifNull: ["$user", null] }
                }
            },
            {
                $addFields: {
                    count: {
                        $let: {
                            vars: {
                                matchedItem: {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: { $ifNull: ["$user.cart", []] },
                                                as: "cartItem",
                                                cond: {
                                                    $eq: [
                                                        "$$cartItem.goodId",
                                                        { $toString: "$$ROOT._id" },
                                                    ],
                                                },
                                            },
                                        },
                                        0,
                                    ],
                                },
                            },
                            in: {
                                $cond: {
                                    if: { $ne: ["$$matchedItem", null] },
                                    then: "$$matchedItem.count",
                                    else: 0,
                                },
                            },
                        },
                    },
                },
            },
            {
                $addFields: {
                    favorite: {
                        $cond: {
                            if: { $ne: ["$user", null] },
                            then: {
                                $let: {
                                    vars: {
                                        matchedFavorite: {
                                            $arrayElemAt: [
                                                {
                                                    $filter: {
                                                        input: { $ifNull: ["$user.favorites", []] },
                                                        as: "favoriteItem",
                                                        cond: {
                                                            $eq: [
                                                                "$$favoriteItem",
                                                                { $toString: "$$ROOT._id" },
                                                            ],
                                                        },
                                                    },
                                                },
                                                0,
                                            ],
                                        },
                                    },
                                    in: {
                                        $cond: {
                                            if: { $gt: [{ $type: "$$matchedFavorite" }, "missing"] },
                                            then: true,
                                            else: "$$REMOVE",
                                        },
                                    },
                                },
                            },
                            else: "$$REMOVE",
                        },
                    },
                },
            },
            {
                $project: {
                    user: 0,
                },
            },
            { $skip: offset },
            { $limit: limit },
        ])
            .exec();
    }
    async getGoodFindByKeyword(keyWord, options) {
        const query = this.goodModel.find(this.buildMatchConditionByKeyword(keyWord));
        if (options.offset) {
            query.skip(options.offset);
        }
        if (options.limit) {
            query.limit(options.limit);
        }
        return query.exec();
    }
    async getGoodsByCategory(dto, options) {
        const query = this.goodModel.find({
            category: { $in: dto.category },
        });
        if (options.offset) {
            query.skip(options.offset);
        }
        if (options.limit) {
            query.limit(options.limit);
        }
        return query.exec();
    }
    async getGoodsByIds(dto, options) {
        const query = this.goodModel.find({ _id: { $in: dto.ids } });
        if (options.offset) {
            query.skip(options.offset);
        }
        if (options.limit) {
            query.limit(options.limit);
        }
        return query.exec();
    }
    async getGoodsByDiscountСlassification(dto, options) {
        const query = this.goodModel.find({ [dto]: { $exists: true } });
        if (options.offset) {
            query.skip(options.offset);
        }
        if (options.limit) {
            query.limit(options.limit);
        }
        return query.exec();
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
                                cart_item: {
                                    $filter: {
                                        input: "$cart",
                                        as: "item",
                                        cond: { $eq: ["$$item.goodId", "$$goodId"] },
                                    },
                                },
                            },
                        },
                        {
                            $project: {
                                count: { $arrayElemAt: ["$cart_item.count", 0] },
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
GoodService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(good_model_1.GoodModel)),
    __metadata("design:paramtypes", [typeof (_a = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _a : Object])
], GoodService);
exports.GoodService = GoodService;
//# sourceMappingURL=good.service.js.map