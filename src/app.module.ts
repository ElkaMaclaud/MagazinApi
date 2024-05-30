import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { GoodModule } from "./good/good.module";
import { ReviewModule } from "./review/review.module";
import { UserModule } from "./user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypegooseModule } from "nestjs-typegoose";
import { getMongoConfig } from "./configs/mongo.config";
import { ScheduleModule } from "@nestjs/schedule";
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    AuthModule,
    GoodModule,
    ReviewModule,
    UserModule,
  ],
})
export class AppModule {}
