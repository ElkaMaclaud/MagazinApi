"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodModule = void 0;
const common_1 = require("@nestjs/common");
const good_controller_1 = require("./good.controller");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const good_model_1 = require("./good.model");
const good_service_1 = require("./good.service");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../configs/jwt.config");
const jwt_stratagy_1 = require("../user/strategies/jwt.stratagy");
let GoodModule = class GoodModule {
};
exports.GoodModule = GoodModule;
exports.GoodModule = GoodModule = __decorate([
    (0, common_1.Module)({
        controllers: [good_controller_1.GoodController],
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: good_model_1.GoodModel,
                    schemaOptions: {
                        collection: "Good",
                    },
                },
            ]),
            config_1.ConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: jwt_config_1.getJWTConfig,
            }),
        ],
        providers: [good_service_1.GoodService, jwt_stratagy_1.JwtStratagy],
    })
], GoodModule);
//# sourceMappingURL=good.module.js.map