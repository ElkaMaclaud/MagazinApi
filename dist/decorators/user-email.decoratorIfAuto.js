"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmail = void 0;
const common_1 = require("@nestjs/common");
exports.UserEmail = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return user && user.email ? user.email : null;
});
//# sourceMappingURL=user-email.decoratorIfAuto.js.map