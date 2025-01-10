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
    buildMatchConditionByKeyword(keyword: string): {
        $or: ({
            brand: {
                $regex: string;
                $options: string;
            };
            name?: undefined;
            description?: undefined;
            category?: undefined;
            characteristics?: undefined;
            'characteristics.name'?: undefined;
            'characteristics.value'?: undefined;
        } | {
            name: {
                $regex: string;
                $options: string;
            };
            brand?: undefined;
            description?: undefined;
            category?: undefined;
            characteristics?: undefined;
            'characteristics.name'?: undefined;
            'characteristics.value'?: undefined;
        } | {
            description: {
                $regex: string;
                $options: string;
            };
            brand?: undefined;
            name?: undefined;
            category?: undefined;
            characteristics?: undefined;
            'characteristics.name'?: undefined;
            'characteristics.value'?: undefined;
        } | {
            category: {
                $regex: string;
                $options: string;
            };
            brand?: undefined;
            name?: undefined;
            description?: undefined;
            characteristics?: undefined;
            'characteristics.name'?: undefined;
            'characteristics.value'?: undefined;
        } | {
            characteristics: {
                $regex: string;
                $options: string;
            };
            brand?: undefined;
            name?: undefined;
            description?: undefined;
            category?: undefined;
            'characteristics.name'?: undefined;
            'characteristics.value'?: undefined;
        } | {
            'characteristics.name': {
                $regex: string;
                $options: string;
            };
            brand?: undefined;
            name?: undefined;
            description?: undefined;
            category?: undefined;
            characteristics?: undefined;
            'characteristics.value'?: undefined;
        } | {
            'characteristics.value': {
                $regex: string;
                $options: string;
            };
            brand?: undefined;
            name?: undefined;
            description?: undefined;
            category?: undefined;
            characteristics?: undefined;
            'characteristics.name'?: undefined;
        })[];
    };
    getGoodsByDiscountСlassificationUser(email: string, value: string | {
        [key: string]: string;
    }, options: OptionsLimits): Promise<DocumentType<GoodModel>[] | void>;
    getGoodFindByKeyword(keyWord: any, options: any): Promise<any>;
    getGoodsByCategory(dto: {
        category: string;
    }, options: OptionsLimits): Promise<DocumentType<GoodModel>[] | void>;
    getGoodsByIds(dto: GoodIdsDto, options: OptionsLimits): Promise<DocumentType<GoodModel>[] | void>;
    getGoodsByDiscountСlassification(dto: string, options: OptionsLimits): Promise<DocumentType<GoodModel>[] | void>;
    getGoodById(id: string): Promise<GoodModel | void>;
    getGoodByIdForUser(id: string, email: string): Promise<GoodModel | void>;
}
