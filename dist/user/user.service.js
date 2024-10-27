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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const user_model_1 = require("./user.model");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = require("bcryptjs");
const user_constant_1 = require("./user.constant");
let UserService = class UserService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async registerUser(dto) {
        const salt = await (0, bcryptjs_1.genSalt)(10);
        const newUser = await this.userModel.create({
            publik: {
                name: dto.name,
                city: "",
                age: 20,
            },
            privates: {
                phone: dto?.phone || "",
                dateOfBirth: new Date(dto?.dateofBirth) || new Date(),
                role: "user",
                email: dto.email,
                passwordHash: await (0, bcryptjs_1.hash)(dto.password, salt),
            },
            favorites: [],
            basket: [],
            order: [],
            delivery: {
                address: "",
                pickUpPoin: "",
                choice: "pickUpPoin",
            },
            typegooseName: "",
        });
        return newUser.save();
    }
    async findUser(email) {
        return this.userModel.findOne({ "privates.email": email }).exec();
    }
    async validateUser(email, password) {
        const user = await this.findUser(email);
        if (!user) {
            throw new common_1.UnauthorizedException(user_constant_1.USER_NOT_FOUND_ERROR);
        }
        const isCorrectPassword = await (0, bcryptjs_1.compare)(password, user.privates.passwordHash);
        if (!isCorrectPassword) {
            throw new common_1.UnauthorizedException(user_constant_1.WRONG_PASSWORD_ERROR);
        }
        return { email: user.privates.email };
    }
    async login(email) {
        const payload = { email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async getData(email, field, options) {
        const offset = options.offset || 0;
        const limit = options.limit || 50;
        const result = await this.userModel
            .aggregate([
            { $match: { "privates.email": email } },
            {
                $unwind: `$${field}`,
            },
            {
                $lookup: {
                    from: "Good",
                    let: {
                        goodId: {
                            $cond: {
                                if: { $eq: [field, "basket"] },
                                then: `$${field}.goodId`,
                                else: `$${field}`,
                            },
                        },
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: [{ $toString: "$_id" }, "$$goodId"] },
                            },
                        },
                    ],
                    as: "goodInfo",
                },
            },
            {
                $addFields: {
                    [field]: {
                        $cond: {
                            if: { $eq: [field, "basket"] },
                            then: {
                                $mergeObjects: [
                                    `$${field}`,
                                    { $arrayElemAt: ["$goodInfo", 0] },
                                ],
                            },
                            else: {
                                $cond: {
                                    if: { $eq: [field, "favorites"] },
                                    then: {
                                        $let: {
                                            vars: {
                                                basketItem: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$basket",
                                                                as: "item",
                                                                cond: {
                                                                    $eq: [
                                                                        "$$item.goodId",
                                                                        { $toString: `$${field}` },
                                                                    ],
                                                                },
                                                            },
                                                        },
                                                        0,
                                                    ],
                                                },
                                            },
                                            in: {
                                                $mergeObjects: [
                                                    { goodId: { $toString: `$${field}` } },
                                                    { count: "$$basketItem.count" },
                                                    { favorite: true },
                                                    { $arrayElemAt: ["$goodInfo", 0] },
                                                ],
                                            },
                                        },
                                    },
                                    else: {
                                        $mergeObjects: [
                                            { goodId: { $toString: `$${field}` } },
                                            { $arrayElemAt: ["$goodInfo", 0] },
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
            },
            {
                $group: {
                    _id: "$_id",
                    [field]: { $push: `$${field}` },
                },
            },
            {
                $project: {
                    _id: 0,
                    [field]: 1,
                },
            },
            { $unwind: `$${field}` },
            { $skip: offset },
            { $limit: limit },
            {
                $group: {
                    _id: null,
                    [field]: { $push: `$${field}` },
                },
            },
            {
                $project: {
                    _id: 0,
                    [field]: 1,
                },
            },
        ])
            .exec();
        return result[0]?.[field] || [];
    }
    async getBasket(email, options) {
        return this.getData(email, "basket", options);
    }
    async getFavorites(email, options) {
        return this.getData(email, "favorites", options);
    }
    async getOrders(email, options) {
        return this.getData(email, "order", options);
    }
    async getUserData(email) {
        return this.userModel
            .findOne({ "privates.email": email }, { publik: 1, privates: 1, delivery: 1 })
            .exec();
    }
    async updateUserData(dto, email) {
        const updatedUser = await this.userModel
            .findOneAndUpdate({ "privates.email": email }, [
            {
                $set: {
                    publik: {
                        $mergeObjects: ["$publik", { name: dto.name }],
                    },
                    privates: {
                        $mergeObjects: ["$privates", { phone: dto.phone }],
                    },
                },
            },
        ], { new: true, useFindAndModify: false })
            .exec();
        return {
            phone: updatedUser.privates.phone,
            name: updatedUser.publik.name,
        };
    }
    async updateDelivery(dto, email) {
        const updatedUser = await this.userModel
            .findOneAndUpdate({ "privates.email": email }, [
            {
                $set: { delivery: { $mergeObjects: ["$delivery", dto] } },
            },
        ], { new: true, useFindAndModify: false })
            .exec();
        return updatedUser.delivery;
    }
    async updateGoodToBasket(email, goodId, operand = "add", token) {
        let operator = "add";
        if (operand === "sub") {
            operator = "subtract";
        }
        await this.userModel.updateOne({ "privates.email": email }, [
            {
                $set: {
                    isExisting: { $in: [goodId, "$basket.goodId"] },
                    existingItem: {
                        $filter: {
                            input: "$basket",
                            as: "item",
                            cond: { $eq: ["$$item.goodId", goodId] },
                        },
                    },
                },
            },
            {
                $set: {
                    basket: {
                        $cond: {
                            if: "$isExisting",
                            then: {
                                $cond: {
                                    if: {
                                        $and: [
                                            {
                                                $lt: [
                                                    {
                                                        $first: {
                                                            $map: {
                                                                input: "$existingItem",
                                                                as: "item",
                                                                in: "$$item.count",
                                                            },
                                                        },
                                                    },
                                                    2,
                                                ],
                                            },
                                            { $eq: [operator, "subtract"] },
                                        ],
                                    },
                                    then: {
                                        $filter: {
                                            input: "$basket",
                                            as: "item",
                                            cond: { $ne: ["$$item.goodId", goodId] },
                                        },
                                    },
                                    else: {
                                        $map: {
                                            input: "$basket",
                                            as: "item",
                                            in: {
                                                $cond: {
                                                    if: { $eq: ["$$item.goodId", goodId] },
                                                    then: {
                                                        goodId: "$$item.goodId",
                                                        count: {
                                                            [`$${operator}`]: ["$$item.count", 1],
                                                        },
                                                    },
                                                    else: "$$item",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                            else: {
                                $cond: {
                                    if: { $eq: [operand, "add"] },
                                    then: {
                                        $concatArrays: [
                                            "$basket",
                                            [{ goodId: goodId, count: 1, choice: true }],
                                        ],
                                    },
                                    else: "$basket",
                                },
                            },
                        },
                    },
                },
            },
            {
                $unset: ["isExisting", "existingItem"],
            },
        ], { new: true, useFindAndModify: false });
        const result = await this.userModel
            .aggregate([
            {
                $match: { "privates.email": email },
            },
            {
                $lookup: {
                    from: "Good",
                    let: { goodId: { $toString: goodId } },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$$goodId", { $toString: "$_id" }] },
                            },
                        },
                    ],
                    as: "goodDetails",
                },
            },
            {
                $project: {
                    updated: {
                        $mergeObjects: [
                            {
                                $arrayElemAt: [
                                    {
                                        $filter: {
                                            input: "$basket",
                                            as: "item",
                                            cond: { $eq: ["$$item.goodId", goodId] },
                                        },
                                    },
                                    0,
                                ],
                            },
                            { $arrayElemAt: ["$goodDetails", 0] },
                        ],
                    },
                },
            },
            {
                $project: {
                    "updated.goodId": 0,
                },
            },
        ])
            .exec();
        if (token) {
            return { result: result[0]?.updated, token };
        }
        return result[0]?.updated || {};
    }
    async deleteGood(email, id, field) {
        await this.userModel
            .updateOne({ "privates.email": email }, { $pull: { [field]: { goodId: id } } })
            .exec();
        return { id };
    }
    async addBasket(id, email) {
        if (email) {
            return this.updateGoodToBasket(email, id);
        }
        const fakeEmail = `${Math.random().toString(36).substring(2, 15)}@mail.com`;
        const dto = {
            email: fakeEmail,
            dateofBirth: "2024-10-27",
            password: ""
        };
        await this.registerUser(dto);
        const access_token = await this.jwtService.signAsync({ email: fakeEmail });
        return this.updateGoodToBasket(fakeEmail, id, "add", access_token);
    }
    async toggleChoice(goodId, email) {
        const updated = await this.userModel
            .findOneAndUpdate({ "privates.email": email }, [
            {
                $set: {
                    basket: {
                        $map: {
                            input: "$basket",
                            as: "item",
                            in: {
                                $cond: {
                                    if: {
                                        $eq: ["$$item.goodId", goodId],
                                    },
                                    then: {
                                        goodId: "$$item.goodId",
                                        count: "$$item.count",
                                        choice: {
                                            $not: ["$$item.choice"],
                                        },
                                    },
                                    else: "$$item",
                                },
                            },
                        },
                    },
                },
            },
        ], { new: true, useFindAndModify: false })
            .exec();
        return updated.basket.find((good) => good.goodId === goodId);
    }
    async ChooseAll(email, on) {
        const updated = await this.userModel
            .findOneAndUpdate({ "privates.email": email }, [
            {
                $set: {
                    basket: {
                        $map: {
                            input: "$basket",
                            as: "item",
                            in: {
                                $mergeObjects: ["$$item", { choice: on }],
                            },
                        },
                    },
                },
            },
        ], { new: true, useFindAndModify: false })
            .exec();
        return updated.basket;
    }
    async toggleFavorites(goodId, email) {
        if (email) {
            return this.toggleFavoritesByEmail(goodId, email);
        }
        const fakeEmail = `${Math.random().toString(36).substring(2, 15)}@mail.com`;
        const dto = {
            email: fakeEmail,
            dateofBirth: "2024-10-27",
            password: ""
        };
        await this.registerUser(dto);
        const access_token = await this.jwtService.signAsync({ email: fakeEmail });
        return this.toggleFavoritesByEmail(goodId, fakeEmail, access_token);
    }
    async toggleFavoritesByEmail(goodId, email, token) {
        const updateResult = (await this.userModel
            .findOneAndUpdate({ "privates.email": email }, [
            {
                $set: {
                    isExisting: { $in: [goodId, "$favorites"] },
                },
            },
            {
                $set: {
                    existing: { $in: [goodId, "$favorites"] },
                    favorites: {
                        $cond: {
                            if: "$isExisting",
                            then: { $setDifference: ["$favorites", [goodId]] },
                            else: { $concatArrays: ["$favorites", [goodId]] },
                        },
                    },
                },
            },
        ], { new: true, useFindAndModify: false })
            .exec());
        let result;
        if (updateResult.favorites.includes(goodId)) {
            result = await this.userModel
                .aggregate([
                {
                    $match: { "privates.email": email },
                },
                {
                    $lookup: {
                        from: "Good",
                        let: { goodId: { $toString: goodId } },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ["$$goodId", { $toString: "$_id" }] },
                                },
                            },
                        ],
                        as: "goodDetails",
                    },
                },
                {
                    $project: {
                        updated: {
                            $mergeObjects: [
                                {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: "$favorites",
                                                as: "item",
                                                cond: { $eq: ["$$item.goodId", goodId] },
                                            },
                                        },
                                        0,
                                    ],
                                },
                                { $arrayElemAt: ["$goodDetails", 0] },
                                { favorite: true },
                                {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: "$basket",
                                                as: "item",
                                                cond: { $eq: ["$$item.goodId", goodId] },
                                            },
                                        },
                                        0,
                                    ],
                                },
                            ],
                        },
                    },
                },
                {
                    $project: {
                        "updated.goodId": 0,
                    },
                },
            ])
                .exec();
            result = result[0]?.updated;
            if (token) {
                return { result, token };
            }
        }
        return result || {};
    }
    async addOrder(email, ids) {
        const updated = await this.userModel.findOneAndUpdate({ "privates.email": email }, {
            $pull: {
                basket: {
                    goodId: { $in: ids },
                },
            },
            $push: { order: { $each: ids } },
        }, { new: true, useFindAndModify: false });
        return updated.order;
    }
    async subBasket(email, id) {
        return this.updateGoodToBasket(email, id, "sub");
    }
    async deleteSelected(email) {
        const basket = await this.userModel.findOneAndUpdate({ "privates.email": email }, [
            {
                $set: {
                    basket: {
                        $filter: {
                            input: "$basket",
                            as: "item",
                            cond: { $eq: ["$$item.choice", false] },
                        },
                    },
                },
            },
        ], { new: true, useFindAndModify: false });
        return basket.basket;
    }
    async deleteBasket(email, id) {
        return this.deleteGood(email, id, "basket");
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map