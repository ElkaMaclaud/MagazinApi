// Сервис для получения товаров из монгодб
import { Injectable } from "@nestjs/common";
import { GoodModel } from "./good.model";
import { DocumentType, ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";
import { GoodIdsDto } from "./dto/find-goods.dto";
// import { GoodDto } from "./dto/find-goods.dto";
// import * as path from "path";
// import * as fs from "fs";

@Injectable()
export class GoodService {
  constructor(
    @InjectModel(GoodModel) private readonly goodModel: ModelType<GoodModel>,
  ) {}

  async getGoodsByCategory(dto: {
    category: string;
  }): Promise<DocumentType<GoodModel>[] | void> {
    return this.goodModel.find({ category: { $in: dto.category } }).exec();
  }

  async getGoodsByIds(
    dto: GoodIdsDto,
  ): Promise<DocumentType<GoodModel>[] | void> {
    return this.goodModel.find({ _id: { $in: dto.ids } }).exec();
  }

  async getGoodsByDiscountСlassification(
    dto: string,
  ): Promise<DocumentType<GoodModel>[] | void> {
    return this.goodModel.find({ [dto]: { $exists: true } }).exec();
  }

  async getGoodById(id: string): Promise<GoodModel | void> {
    return this.goodModel.findById(id).exec();
  }
  async getGoodByIdForUser(
    id: string,
    email: string,
  ): Promise<GoodModel | void> {
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

  // Второй вариант агрегации!!!
  // Более интуитивный!

  // async getGoodById(id: string, email: string): Promise<GoodModel | void> {
  //   const result = await this.goodModel
  //     .aggregate([
  //       // Находим товар по его ID
  //       {
  //         $match: { $expr: { $eq: [{ $toString: "$_id" }, id] } },
  //       },

  //       {
  //         $lookup: {
  //           from: "User",
  //           let: { userEmail: email },
  //           pipeline: [
  //             {
  //               $match: {
  //                 $expr: { $eq: ["$private.email", "$$userEmail"] },
  //               },
  //             },
  //             {
  //               $unwind: "$basket",
  //             },
  //             {
  //               $match: { "basket.goodId": id },
  //             },
  //             {
  //               $project: {
  //                 count: "$basket.count",
  //                 favorites: 1,
  //               },
  //             },
  //           ],
  //           as: "user",
  //         },
  //       },
  //       // Возвращаем результат
  //       {
  //         $addFields: {
  //           count: {
  //             $arrayElemAt: ["$user.count", 0],
  //           },

  //           favorite: {
  //             $cond: {
  //               if: {
  //                 $in: [
  //                   id,
  //                   {
  //                     $arrayElemAt: ["$user.favorites", 0],
  //                   },
  //                 ],
  //               },

  //               then: true,
  //               else: false,
  //             },
  //           },
  //         },
  //       },
  //       {
  //         $replaceRoot: {
  //           newRoot: {
  //             $mergeObjects: [
  //               {
  //                 count: "$count",
  //                 favorite: "$favorite"
  //               },
  //               "$$ROOT",
  //             ],
  //           },
  //         },
  //       },
  // {
  //         $lookup: {
  //           from: "Review",
  //           let: { goodId: { $toString: "$_id" } },
  //           pipeline: [
  //             {
  //               $match: {
  //                 $expr: { $eq: ["$$goodId", "$goodId"] },
  //               },
  //             },
  //           ],
  //           as: "reviews",
  //         },
  //       },
  //       {
  //         $addFields: {
  //           reviewCount: { $size: "$reviews" },
  //           reviewAvg: { $avg: "$reviews.rating" },
  //         },
  //       },
  //       {
  //         $project: {
  //           user: 0,
  //         },
  //       },
  //     ])
  //     .exec();
  //     return result[0]
  // }

  // Функция для занесения данных в бд (одноразовая)
  // Функцию для создания и внесения товаров в бд нужно будет реализовать для продавцов в будущем возможно..., но такой цели пока нет
  // Собственно нет и фронта для продавцов, так что Функцию для создания товаров будет излишней пока...

  // async writeDataToBD() {
  //   const filePath = path.join(process.cwd(), "./src/database", "data.json");
  //   const rawdata = fs.readFileSync(filePath, "utf8");
  //   const data: { good: GoodDto[] } = JSON.parse(rawdata);
  //   await this.goodModel.insertMany(data.good);
  // }
}
