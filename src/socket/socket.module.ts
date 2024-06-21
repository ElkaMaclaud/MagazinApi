import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from 'src/configs/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStratagy } from 'src/user/strategies/jwt.stratagy';
import { SocketController } from './socket.controller';

@Module({
  controllers: [SocketController],
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
  providers: [SocketService, JwtStratagy],
  
})
export class SocketModule {}
