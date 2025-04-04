import { Module } from "@nestjs/common";
import { GoodModule } from "./good/good.module";
import { ReviewModule } from "./review/review.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypegooseModule } from "nestjs-typegoose";
import { getMongoConfig } from "./configs/mongo.config";
import { UserModule } from "./user/user.module";
import { ChatModule } from './chat/chat.module';
import { MessengerModule } from './messenger/messenger.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    GoodModule,
    ReviewModule,
    UserModule,
    MessengerModule,
    ChatModule,
    MessengerModule,
  ],
})
export class AppModule {}
