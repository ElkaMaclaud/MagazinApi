import { GoodModel } from "./good.model";
import { DocumentType, ModelType } from "@typegoose/typegoose/lib/types";
import { GoodIdsDto, OptionsLimits } from "./dto/find-goods.dto";
export declare class GoodService {
    private readonly goodModel;
    constructor(goodModel: ModelType<GoodModel>);
    buildMatchCondition(value: string | {
        [key: string]: string;
    }): {
        [key: string]: any;
    };
    getGoodsByDiscountСlassificationUser(email: string, value: string | {
        [key: string]: string;
    }, options: OptionsLimits): Promise<DocumentType<GoodModel>[] | void>;
    getGoodsByCategory(dto: {
        category: string;
    }, options: OptionsLimits): Promise<DocumentType<GoodModel>[] | void>;
    getGoodsByIds(dto: GoodIdsDto, options: OptionsLimits): Promise<DocumentType<GoodModel>[] | void>;
    getGoodsByDiscountСlassification(dto: string, options: OptionsLimits): Promise<DocumentType<GoodModel>[] | void>;
    getGoodById(id: string): Promise<GoodModel | void>;
    getGoodByIdForUser(id: string, email: string): Promise<GoodModel | void>;
}
