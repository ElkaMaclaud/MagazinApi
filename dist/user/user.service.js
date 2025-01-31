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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const user_model_1 = require("./user.model");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = require("bcryptjs");
const user_constant_1 = require("./user.constant");
const chat_model_1 = require("../chat/chat.model");
let UserService = class UserService {
    constructor(userModel, chatModel, jwtService) {
        this.userModel = userModel;
        this.chatModel = chatModel;
        this.jwtService = jwtService;
    }
    async registerUser(dto, registered) {
        const salt = await (0, bcryptjs_1.genSalt)(10);
        const newUser = await this.userModel.create({
            publik: {
                name: dto.name,
                city: "",
                age: 20,
            },
            privates: {
                phone: dto?.phone || "",
                dateOfBirth: dto.dateofBirth ? new Date(dto.dateofBirth) : new Date(),
                role: "user",
                email: dto.email,
                passwordHash: await (0, bcryptjs_1.hash)(dto.password, salt),
            },
            favorites: [],
            cart: [],
            order: [],
            delivery: {
                address: "",
                pickUpPoin: "",
                choice: "pickUpPoin",
            },
            typegooseName: "",
            registered: registered === false ? false : true,
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
        const secret = process.env.JWT_SECRET;
        return {
            access_token: await this.jwtService.signAsync(payload, { secret }),
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
                                    if: { $eq: [field, "cart"] },
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
                                if: { $eq: [field, "cart"] },
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
                                                    cartItem: {
                                                        $arrayElemAt: [
                                                            {
                                                                $filter: {
                                                                    input: "$cart",
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
                                                        { count: "$$cartItem.count" },
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
    async getCart(email, options) {
        return this.getData(email, "cart", options);
    }
    async getFavorites(email, options) {
        return this.getData(email, "favorites", options);
    }
    async getOrders(email, options) {
        return this.getData(email, "order", options);
    }
    async getAllChats(email) {
        return await this.userModel
            .findOne({ "privates.email": email })
            .select('chats')
            .populate('chats')
            .exec();
    }
    async getUserData(email) {
        return this.userModel
            .findOne({ "privates.email": email })
            .select({ publik: 1, privates: 1, delivery: 1, registered: 1, _id: 1, chats: 1 })
            .populate('chats')
            .exec();
    }
    async createNewChat(dto) {
        const { userId, unprocessedId, unprocessedUserTitle, titleId } = dto
        const id = unprocessedId.replace(/^\\+|\\+$/g, '').trim()
        const userTitle = unprocessedUserTitle.replace(/^\\+|\\+$/g, '').trim()
        const chat = await this.chatModel.create({
            participants: [{ userId, title: userTitle }, { userId: id, title: titleId }],
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const updateQuery = {
            $push: { chats: { $each: [chat._id], $position: 0 } }
        };
        let user;
        if (id === "679b78b73ee3771d25a12239") {
            await this.userModel.updateMany({ _id: { $in: [userId, id] } }, updateQuery, { new: true });
            user = await this.userModel.findById(userId).populate('chats').exec();
        }
        else {
            user = await this.userModel.findOneAndUpdate({ _id: userId }, updateQuery, { new: true }).populate('chats').exec();
        }
        const socket = activeSockets[id];
        if (socket) {
            socket.emit("new chat", chat);
        }
        return { chats: user.chats };
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
    async updateGoodTocart(email, goodId, operand = "add", token) {
        let operator = "add";
        if (operand === "sub") {
            operator = "subtract";
        }
        await this.userModel.updateOne({ "privates.email": email }, [
            {
                $set: {
                    isExisting: { $in: [goodId, "$cart.goodId"] },
                    existingItem: {
                        $filter: {
                            input: "$cart",
                            as: "item",
                            cond: { $eq: ["$$item.goodId", goodId] },
                        },
                    },
                },
            },
            {
                $set: {
                    cart: {
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
                                            input: "$cart",
                                            as: "item",
                                            cond: { $ne: ["$$item.goodId", goodId] },
                                        },
                                    },
                                    else: {
                                        $map: {
                                            input: "$cart",
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
                                            "$cart",
                                            [{ goodId: goodId, count: 1, choice: true }],
                                        ],
                                    },
                                    else: "$cart",
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
                                                input: "$cart",
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
    async addToCart(id, email) {
        if (email) {
            return this.updateGoodTocart(email, id);
        }
        const fakeEmail = `${Math.random().toString(36).substring(2, 15)}@mail.com`;
        const dto = {
            email: fakeEmail,
            dateofBirth: "2024-10-27",
            password: "",
            registered: false
        };
        await this.registerUser(dto, false);
        const access_token = await this.jwtService.signAsync({ email: fakeEmail });
        return this.updateGoodTocart(fakeEmail, id, "add", access_token);
    }
    async toggleSelect(email, goodId) {
        const updated = await this.userModel
            .findOneAndUpdate({ "privates.email": email }, [
                {
                    $set: {
                        cart: {
                            $map: {
                                input: "$cart",
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
        return updated.cart.find((good) => good.goodId === goodId);
    }
    async selectAll(email, on) {
        const updated = await this.userModel
            .findOneAndUpdate({ "privates.email": email }, [
                {
                    $set: {
                        cart: {
                            $map: {
                                input: "$cart",
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
        return updated.cart;
    }
    async toggleFavorites(goodId, email) {
        if (email) {
            return this.toggleFavoritesByEmail(goodId, email);
        }
        const fakeEmail = `${Math.random().toString(36).substring(2, 15)}@mail.com`;
        const dto = {
            email: fakeEmail,
            dateofBirth: "2024-10-27",
            password: "",
            registered: false
        };
        await this.registerUser(dto, false);
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
                                                    input: "$cart",
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
                cart: {
                    goodId: { $in: ids },
                },
            },
            $push: { order: { $each: ids } },
        }, { new: true, useFindAndModify: false });
        return updated.order;
    }
    async subFromCart(email, id) {
        return this.updateGoodTocart(email, id, "sub");
    }
    async deleteSelected(email) {
        const cart = await this.userModel.findOneAndUpdate({ "privates.email": email }, [
            {
                $set: {
                    cart: {
                        $filter: {
                            input: "$cart",
                            as: "item",
                            cond: { $eq: ["$$item.choice", false] },
                        },
                    },
                },
            },
        ], { new: true, useFindAndModify: false });
        return cart.cart;
    }
    async removeFromCart(email, id) {
        return this.deleteGood(email, id, "cart");
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(chat_model_1.Chat)),
    __metadata("design:paramtypes", [typeof (_a = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _a : Object, typeof (_b = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _b : Object, jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map