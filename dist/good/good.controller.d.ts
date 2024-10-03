import { GoodDiscount, GoodDto, GoodIdsDto } from "./dto/find-goods.dto";
import { GoodService } from "./good.service";
export declare class GoodController {
    private readonly goodService;
    constructor(goodService: GoodService);
    getGoodById(id: string, req: any, email: string): Promise<void | import("./good.model").GoodModel>;
    getGoodsByCategory(dto: Pick<GoodDto, "category">): Promise<void | import("@typegoose/typegoose").DocumentType<import("./good.model").GoodModel>[]>;
    goodsbyIds(dto: GoodIdsDto): Promise<void | import("@typegoose/typegoose").DocumentType<import("./good.model").GoodModel>[]>;
    goodsbySale(dto: GoodDiscount): Promise<void | import("@typegoose/typegoose").DocumentType<import("./good.model").GoodModel>[]>;
    goodsbyDiscount(dto: GoodDiscount): Promise<void | import("@typegoose/typegoose").DocumentType<import("./good.model").GoodModel>[]>;
}
