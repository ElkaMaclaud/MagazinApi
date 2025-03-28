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
const nestjs_typegoose_1 = require("nestjs-typegoose");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../configs/jwt.config");
const seller_model_1 = require("./seller.model");
const seller_controller_1 = require("./seller.controller");
const seller_service_1 = require("./seller.service");
let GoodModule = class GoodModule {
};
GoodModule = __decorate([
    (0, common_1.Module)({
        controllers: [seller_controller_1.SellerController],
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: seller_model_1.SellerModel,
                    schemaOptions: {
                        collection: "Seller",
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
        providers: [seller_service_1.SellerService],
    })
], GoodModule);
exports.GoodModule = GoodModule;
//# sourceMappingURL=seller.module.js.map