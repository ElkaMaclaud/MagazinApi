import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypegooseModule } from "nestjs-typegoose";
import { AuthModel } from "./auth.model";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { getJWTConfig } from "src/configs/jwt.config";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: AuthModel,
        schemaOptions: {
          collection: "Auth",
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
})
export class AuthModule {}
