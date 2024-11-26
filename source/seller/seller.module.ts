import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { getJWTConfig } from "source/configs/jwt.config";
import { SellerModel } from "./seller.model";
import { SellerController } from "./seller.controller";
import { SellerService } from "./seller.service";

@Module({
  controllers: [SellerController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: SellerModel,
        schemaOptions: {
          collection: "Seller",
        },
      },
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
  providers: [SellerService],
})
export class GoodModule {}
