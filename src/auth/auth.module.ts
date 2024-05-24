import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypegooseModule } from "nestjs-typegoose";
import { AuthModel } from "./auth.model";

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
  ],
})
export class AuthModule {}
