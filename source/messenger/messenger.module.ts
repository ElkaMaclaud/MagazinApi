import { Module } from '@nestjs/common';
import { SocketService } from './messenger.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { MessengeModel } from './messenger.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MessengeModel.name, schema: MessengeModel }]),
  ],
  providers: [SocketService]
})
export class MessengerModule {}
