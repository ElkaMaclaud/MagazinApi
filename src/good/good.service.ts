// Сервис для получения товаров из монгодб 
import { Injectable } from "@nestjs/common";
import { GoodModel } from "./good.model";
import { DocumentType, ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";
import { GoodDto } from "./dto/find-goods.dto";
import * as path from "path";
import * as fs from "fs";

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

  async getGoodById(id: string): Promise<GoodModel | void> {
    return this.goodModel.findById(id).exec();
  }

  // Данный метод требует доработки
  // Нужен будет в дальнейшем для получения товаров лоя конкретного пользователя
  async getGoodsByIds(
    ids: string[],
  ): Promise<DocumentType<GoodModel>[] | void> {
    return this.goodModel.find({ _id: { $in: ids } }).exec();
  }

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
