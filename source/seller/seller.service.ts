import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { SellerModel } from "./seller.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { SellerDto } from "./dto/seller.dto";

@Injectable()
export class SellerService {
  constructor(@InjectModel(SellerModel)  private readonly sellerModel: ModelType<SellerModel>) {}
  
  async createSelers(dto: SellerDto[]) {
    const validateSellersData = (data: SellerDto[]) => {
      return data.every(seller => seller.name && seller.email);
    };
    if (!validateSellersData(dto)) {
      console.error("Некоторые записи не содержат обязательные поля!");
    } else {
      await this.sellerModel.insertMany(dto)
        .then(() => console.log("Данные успешно сохранены"))
        .catch(err => console.error("Ошибка при сохранении данных:", err));
    }
  }
}