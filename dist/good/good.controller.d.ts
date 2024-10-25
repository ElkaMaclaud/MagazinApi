import { GoodDto, GoodIdsDto, OptionsLimits } from "./dto/find-goods.dto";
import { GoodService } from "./good.service";
export declare class GoodController {
    private readonly goodService;
    constructor(goodService: GoodService);
    goodsbySale(req: any, email: string, offset?: number, limit?: number): Promise<void | import("@typegoose/typegoose").DocumentType<import("./good.model").GoodModel>[]>;
    goodsbyDiscount(email: string, offset?: number, limit?: number): Promise<void | import("@typegoose/typegoose").DocumentType<import("./good.model").GoodModel>[]>;
    getGoodById(id: string, req: any, email: string): Promise<void | import("./good.model").GoodModel>;
    getGoodsByCategory(dto: Pick<GoodDto, "category"> & OptionsLimits, email: string): Promise<void | import("@typegoose/typegoose").DocumentType<import("./good.model").GoodModel>[]>;
    goodsbyIds(dto: GoodIdsDto, offset?: number, limit?: number): Promise<void | import("@typegoose/typegoose").DocumentType<import("./good.model").GoodModel>[]>;
}
