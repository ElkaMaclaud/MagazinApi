import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { GoodsModule } from "./goods/goods.module";
import { ReviewModule } from "./review/review.module";
import { UserModule } from "./user/user.module";
@Module({
  imports: [AuthModule, GoodsModule, ReviewModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
