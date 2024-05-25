import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { TypegooseModule } from "nestjs-typegoose";
import { UserModel } from "./user.model";
import { UserService } from './user.service';

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
  ],
  providers: [UserService],
})
export class UserModule {}
