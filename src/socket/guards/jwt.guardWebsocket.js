"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuardWebsocket = void 0;
const passport_1 = require("@nestjs/passport");
class JwtAuthGuardWebsocket extends (0, passport_1.AuthGuard)("jwt") {
}
exports.JwtAuthGuardWebsocket = JwtAuthGuardWebsocket;
//# sourceMappingURL=jwt.guardWebsocket.js.map