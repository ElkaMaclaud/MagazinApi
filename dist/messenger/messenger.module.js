"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessengerModule = void 0;
const common_1 = require("@nestjs/common");
const messenger_gateway_1 = require("./messenger.gateway");
const mongoose_1 = require("@nestjs/mongoose");
const messenger_model_1 = require("./messenger.model");
let MessengerModule = class MessengerModule {
};
MessengerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: messenger_model_1.MessengeModel.name, schema: messenger_model_1.MessengeModel }]),
        ],
        providers: [messenger_gateway_1.SocketService]
    })
], MessengerModule);
exports.MessengerModule = MessengerModule;
//# sourceMappingURL=messenger.module.js.map