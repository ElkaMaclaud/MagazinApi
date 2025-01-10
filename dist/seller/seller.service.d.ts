import { SellerModel } from "./seller.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { SellerDto } from "./dto/seller.dto";
export declare class SellerService {
    private readonly sellerModel;
    constructor(sellerModel: ModelType<SellerModel>);
    createSelers(dto: SellerDto[]): Promise<void>;
}
