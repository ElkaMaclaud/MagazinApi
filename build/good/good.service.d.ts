import { GoodModel } from "./good.model";
import { DocumentType, ModelType } from "@typegoose/typegoose/lib/types";
import { GoodIdsDto } from "./dto/find-goods.dto";
export declare class GoodService {
    private readonly goodModel;
    constructor(goodModel: ModelType<GoodModel>);
    getGoodsByCategory(dto: {
        category: string;
    }): Promise<DocumentType<GoodModel>[] | void>;
    getGoodsByIds(dto: GoodIdsDto): Promise<DocumentType<GoodModel>[] | void>;
    getGoodsByDiscountСlassification(dto: string): Promise<DocumentType<GoodModel>[] | void>;
    getGoodById(id: string): Promise<GoodModel | void>;
    getGoodByIdForUser(id: string, email: string): Promise<GoodModel | void>;
}
