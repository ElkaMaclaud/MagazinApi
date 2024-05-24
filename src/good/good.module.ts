import { Module } from "@nestjs/common";
import { GoodController } from './good.controller';
import { TypegooseModule } from "nestjs-typegoose";
import { GoodModel } from "./good.model";

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
  ],
})
export class GoodModule {}
