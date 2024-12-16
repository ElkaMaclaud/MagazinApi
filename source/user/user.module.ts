import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { TypegooseModule } from "nestjs-typegoose";
import { UserModel } from "./user.model";
import { UserService } from "./user.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { getJWTConfig } from "source/configs/jwt.config";
import { JwtStratagy } from "./strategies/jwt.stratagy";
import { PassportModule } from "@nestjs/passport";
import { Chat } from "source/chat/chat.model";

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
      {
        typegooseClass: Chat,
        schemaOptions: {
          collection: 'Chat',
        },
      },
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    PassportModule,
  ],
  providers: [UserService, JwtStratagy],
})
export class UserModule {}
