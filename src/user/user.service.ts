import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { IDelivery, IInfoPrivate, UserModel } from "./user.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { JwtService } from "@nestjs/jwt";
import { genSalt, hash, compare } from "bcryptjs";
import { AuthDto } from "./dto/auth.dto";
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from "./user.constant";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
  ) { }

  async registerUser(dto: AuthDto) {
    const salt = await genSalt(10);
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
        passwordHash: await hash(dto.password, salt),
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

  async findUser(email: string) {
    return this.userModel.findOne({ "privates.email": email }).exec();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<IInfoPrivate, "email">> {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const isCorrectPassword = await compare(
      password,
      user.privates.passwordHash,
    );
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return { email: user.privates.email };
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // В данном методе делаем агрегацию, в которой подтягиваются данные из внешней коллекции в $lookup
  // В поле field м/б: корзина, избран. и куплен. определенного пользователя
  // Дальнейшей оптимизации данный метод не требует!
  async getData(email: string, field: string, options) {
    const offset = options.offset || 0
    const limit = options.limit || 50
    const result = await this.userModel
      .aggregate([
        { $match: { "privates.email": email } },
        {
          $unwind: `$${field}`, // Разбивает внутренний массив док. на отд. докум.
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
                  $expr: { $eq: [{ $toString: "$_id" }, "$$goodId"] }, // Приведение поля _id к строке и сравнение с goodId
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
                  // Объединение полей
                  $mergeObjects: [
                    `$${field}`,
                    { $arrayElemAt: ["$goodInfo", 0] },
                  ],
                },
                else: {
                  $cond: {
                    // Нужен доступ к count, который нах-ся в другом св-ве
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
            [field]: 1, //[field]: { $arrayElemAt: [`$${field}`, 0] }, // [field]: 1 - так возвращал массив!!!!!!!!!!,
          },
        },
        { $unwind: `$${field}` }, // Разворачиваем массив для применения skip и limit
        { $skip: offset },
        { $limit: limit },
        {
          $group: {
            _id: null,
            [field]: { $push: `$${field}` }, // Снова группируем, чтобы вернуть массив
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

  async getBasket(email: string, options) {
    return this.getData(email, "basket", options);
  }

  async getFavorites(email: string, options) {
    return this.getData(email, "favorites", options);
  }

  async getOrders(email: string, options) {
    return this.getData(email, "order", options);
  }

  async getUserData(email: string) {
    return this.userModel
      .findOne({ "privates.email": email }, { publik: 1, privates: 1, delivery: 1 })
      .exec();
  }

  async updateUserData(dto: { name: string; phone: string }, email: string) {
    const updatedUser = await this.userModel
      .findOneAndUpdate(
        { "privates.email": email },
        [
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
        ],
        { new: true, useFindAndModify: false },
      )
      .exec();
    return {
      phone: updatedUser.privates.phone,
      name: updatedUser.publik.name,
    };
  }

  async updateDelivery(dto: IDelivery, email: string) {
    const updatedUser = await this.userModel
      .findOneAndUpdate(
        { "privates.email": email },
        [
          {
            $set: { delivery: { $mergeObjects: ["$delivery", dto] } },
          },
        ],
        { new: true, useFindAndModify: false },
      )
      .exec();

    return updatedUser.delivery;
  }

  async updateGoodToBasket(email: string, goodId: string, operand = "add", token?: string) {
    let operator = "add";
    if (operand === "sub") {
      operator = "subtract";
    }

    await this.userModel.updateOne(
      { "privates.email": email },
      [
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
                        // { $lt: [ { $arrayElemAt: ["$existingItem", 0] }, 2 ] },
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
      ],
      { new: true, useFindAndModify: false },
    );
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
      return { result: result[0]?.updated, token }
    }
    return result[0]?.updated || {};
  }

  async deleteGood(email: string, id: string, field: string) {
    await this.userModel
      .updateOne(
        { "privates.email": email },
        { $pull: { [field]: { goodId: id } } },
      )
      .exec();
    return { id };
  }

  async addBasket(id: string, email?: string) {
    if (email) {
      return this.updateGoodToBasket(email, id);
    }
    const fakeEmail = `${Math.random().toString(36).substring(2, 15)}@mail.com`
    const dto = {
      email: fakeEmail,
      dateofBirth: "2024-10-27",
      password: ""
    }
    await this.registerUser(dto)
    const access_token = await this.jwtService.signAsync({email: fakeEmail})
    return this.updateGoodToBasket(fakeEmail, id, "add", access_token)

  }
  async toggleChoice(email: string, goodId: string) {
    const updated = await this.userModel
      .findOneAndUpdate(
        { "privates.email": email },
        [
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
                          // $cond: {
                          //   if: { $eq: ["$$item.choice", true] },
                          //   then: false,
                          //   else: true,
                          // },
                          $not: ["$$item.choice"],
                        },
                      },
                      // then: {
                      //   $mergeObjects: [
                      //     "$$item",
                      //     {
                      //       choice: {
                      //         $not: ["$$item.choice"],
                      //       },
                      //     },
                      //   ],
                      // },
                      else: "$$item",
                    },
                  },
                },
              },
            },
          },
        ],
        { new: true, useFindAndModify: false },
      )
      .exec();
    return updated.basket.find((good) => good.goodId === goodId);
  }
  async ChooseAll(email: string, on: boolean) {
    const updated = await this.userModel
      .findOneAndUpdate(
        { "privates.email": email },
        [
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
        ],
        { new: true, useFindAndModify: false },
      )
      .exec();
    return updated.basket;
  }
  async toggleFavorites(goodId: string, email?: string) {
    if(email) {
      return this.toggleFavoritesByEmail(goodId, email)
    }
    const fakeEmail = `${Math.random().toString(36).substring(2, 15)}@mail.com`
    const dto = {
      email: fakeEmail,
      dateofBirth: "2024-10-27",
      password: ""
    }
    await this.registerUser(dto)
    const access_token = await this.jwtService.signAsync({email: fakeEmail})
    return this.toggleFavoritesByEmail(goodId, fakeEmail, access_token)
    
  }
  async toggleFavoritesByEmail(goodId: string, email?: string, token?: string) {
    const updateResult = (await this.userModel
      .findOneAndUpdate(
        { "privates.email": email },
        [
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
        ],
        { new: true, useFindAndModify: false },
      )
      .exec()) as unknown as UserModel & { existing?: boolean };
    // .lean() 
    // .exec() as UserModel & { existing?: boolean };
    // const existing = updateResult["isExisting"];
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
        return {result, token}
      }
    }
    return result || {};
  }
  async addOrder(email: string, ids: string[]) {
    const updated = await this.userModel.findOneAndUpdate(
      { "privates.email": email },
      {
        $pull: {
          basket: {
            goodId: { $in: ids },
          },
        },
        $push: { order: { $each: ids } },
      },
      { new: true, useFindAndModify: false },
    );
    return updated.order;
  }

  async subBasket(email: string, id: string) {
    return this.updateGoodToBasket(email, id, "sub");
  }
  async deleteSelected(email: string) {
    const basket = await this.userModel.findOneAndUpdate(
      { "privates.email": email },
      [
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
      ],
      { new: true, useFindAndModify: false },
    );
    return basket.basket;
  }
  async deleteBasket(email: string, id: string) {
    return this.deleteGood(email, id, "basket");
  }
}
