import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { GoodModule } from "./good/good.module";
import { ReviewModule } from "./review/review.module";
import { UserModule } from "./user/user.module";
@Module({
  imports: [AuthModule, GoodModule, ReviewModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
