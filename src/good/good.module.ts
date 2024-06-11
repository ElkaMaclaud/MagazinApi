import { Module } from "@nestjs/common";
import { GoodController } from './good.controller';
import { TypegooseModule } from "nestjs-typegoose";
import { GoodModel } from "./good.model";
import { GoodService } from './good.service';
import { GetUserData } from "src/middleware/authMiddleware";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { getJWTConfig } from "src/configs/jwt.config";

@Module({
  controllers: [GoodController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: GoodModel,
        schemaOptions: {
          collection: "Good",
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
  providers: [GoodService, GetUserData],
})
export class GoodModule {}
