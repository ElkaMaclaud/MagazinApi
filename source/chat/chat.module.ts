import { Module } from '@nestjs/common';
import { ChatService } from './chat/chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  providers: [ChatService, ChatGateway]
})
export class ChatModule {}
