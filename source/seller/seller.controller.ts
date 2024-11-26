import { Body, Controller, Post } from "@nestjs/common"
import { SellerDto } from "./dto/seller.dto"
import { SellerService } from "./seller.service"

@Controller("good")
export class SellerController {
    constructor(private readonly sellerService: SellerService) {}

    @Post("createSelers")
    async createSelers(
        @Body() dto: SellerDto[],
    ) {
        return this.sellerService.createSelers(dto)
    }
}