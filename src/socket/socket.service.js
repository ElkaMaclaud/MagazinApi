"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const user_emailFromWebsocket_decorator_1 = require("../../../../src/decorators/user-emailFromWebsocket.decorator");
const jwt_guard_1 = require("../../../../src/user/guards/jwt.guard");
const jwt_guardWebsocket_1 = require("./guards/jwt.guardWebsocket");
let SocketService = class SocketService {
    constructor() {
        this.firsConnect = true;
    }
    handleConnection(email) {
        console.log("CONNECTED");
        this.firsConnect && this.server.emit("message", "Hello from server, ElkaMaclaud");
        this.firsConnect = false;
    }
    handleDisconnect() {
        console.log("DISCONNECTED");
    }
    handleMessage(client, payload) {
        console.log("Received message:", payload);
        this.server.emit("message", "Ваше сообщение: " + payload);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], SocketService.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(jwt_guardWebsocket_1.JwtAuthGuardWebsocket),
    __param(0, (0, user_emailFromWebsocket_decorator_1.UserEmailSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SocketService.prototype, "handleConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("message"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SocketService.prototype, "handleMessage", null);
SocketService = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: "*",
        },
    }),
    __metadata("design:paramtypes", [])
], SocketService);
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map