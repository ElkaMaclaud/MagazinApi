import { GoodModel } from "./good.model";
import { DocumentType, ModelType } from "@typegoose/typegoose/lib/types";
import { GoodDiscount, GoodIdsDto } from "./dto/find-goods.dto";
export declare class GoodService {
    private readonly goodModel;
    constructor(goodModel: ModelType<GoodModel>);
    getGoodsByCategory(dto: {
        category: string;
    }): Promise<DocumentType<GoodModel>[] | void>;
    getGoodsByIds(dto: GoodIdsDto): Promise<DocumentType<GoodModel>[] | void>;
    getGoodsByDiscountСlassification(dto: GoodDiscount): Promise<DocumentType<GoodModel>[] | void>;
    getGoodById(id: string): Promise<GoodModel | void>;
    getGoodByIdForUser(id: string, email: string): Promise<GoodModel | void>;
}
