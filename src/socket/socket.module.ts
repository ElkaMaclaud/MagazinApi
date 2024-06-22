import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from 'src/configs/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { WebSocketJwtStrategy } from './strategies/jwt.websocketStrategy';

@Module({
  imports: [
    TypegooseModule.forFeature([
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    PassportModule,
  ],
  providers: [SocketService, WebSocketJwtStrategy],
  
})
export class SocketModule {}
