// Сервис для получения товаров из монгодб 
import { Inject, Injectable } from "@nestjs/common";
import { GoodModel } from "./good.model";
import { DocumentType, ModelType } from "@typegoose/typegoose/lib/types";

@Injectable()
export class GoodService {
  constructor(
    @Inject(GoodModel) private readonly goodModel: ModelType<GoodModel>,
  ) {}

  async getGoodsByCategory(
    dto: {category: string},
  ): Promise<DocumentType<GoodModel>[] | void> {
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
}
