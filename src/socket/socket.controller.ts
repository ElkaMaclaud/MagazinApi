import { Controller, Get } from '@nestjs/common';
import { SocketService } from './socket.service';

@Controller('socket')
export class SocketController {
    constructor(private readonly socketService: SocketService) {}

    @Get('send')
    sendMessage() {
        this.socketService.server.emit('message', 'Hello from server');
    }
}
