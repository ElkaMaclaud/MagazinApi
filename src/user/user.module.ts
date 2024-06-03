import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { TypegooseModule } from "nestjs-typegoose";
import { UserModel } from "./user.model";
import { UserService } from './user.service';
import { GoodService } from "src/good/good.service";
import { GoodModel } from "src/good/good.model";

@Module({
  controllers: [UserController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: "User",
        },
      },
    ]),
    GoodModel
  ],
  providers: [UserService],
})
export class UserModule {}
