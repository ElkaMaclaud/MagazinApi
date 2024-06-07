import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { TypegooseModule } from "nestjs-typegoose";
import { UserModel } from "./user.model";
import { UserService } from "./user.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { getJWTConfig } from "src/configs/jwt.config";

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
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
  providers: [UserService],
})
export class UserModule {}
