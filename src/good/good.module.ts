import { Module } from "@nestjs/common";
import { GoodController } from './good.controller';
import { TypegooseModule } from "nestjs-typegoose";
import { GoodModel } from "./good.model";
import { GoodService } from './good.service';

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
  providers: [GoodService, GoodModel],
  exports: [GoodService],
})
export class GoodModule {}
