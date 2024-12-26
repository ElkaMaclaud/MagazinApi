import { Module } from '@nestjs/common';
import { ChatService } from './chat/chat.service';
import { ChatGateway } from './chat.gateway';
import {Chat} from "./chat.model"

@Module({
  providers: [ChatService, ChatGateway], 
  exports: [Chat]
})
export class ChatModule {}
