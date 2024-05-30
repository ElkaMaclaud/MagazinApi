// Сервис для получения товаров из монгодб 
import { Injectable } from "@nestjs/common";
import { GoodModel } from "./good.model";
import { DocumentType, ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";
import { GoodDto } from "./dto/find-goods.dto";
import { readFileSync } from "fs";
import path from "path";

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

    async writeDataToBD() {
    const filePath = path.join(process.cwd(), "database", "data.json");
    const rawdata = readFileSync(filePath);
    const data: GoodDto = JSON.parse(rawdata.toString());
    await this.goodModel.insertMany(data);
  }
}
