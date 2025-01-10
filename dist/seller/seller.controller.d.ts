import { SellerDto } from "./dto/seller.dto";
import { SellerService } from "./seller.service";
export declare class SellerController {
    private readonly sellerService;
    constructor(sellerService: SellerService);
    createSelers(dto: SellerDto[]): Promise<void>;
}
