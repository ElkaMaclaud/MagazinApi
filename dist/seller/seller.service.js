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
exports.SellerService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const seller_model_1 = require("./seller.model");
let SellerService = class SellerService {
    constructor(sellerModel) {
        this.sellerModel = sellerModel;
    }
    async createSelers(dto) {
        const validateSellersData = (data) => {
            return data.every(seller => seller.name && seller.email);
        };
        if (!validateSellersData(dto)) {
            console.error("Некоторые записи не содержат обязательные поля!");
        }
        else {
            await this.sellerModel.insertMany(dto)
                .then(() => console.log("Данные успешно сохранены"))
                .catch(err => console.error("Ошибка при сохранении данных:", err));
        }
    }
};
SellerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(seller_model_1.SellerModel)),
    __metadata("design:paramtypes", [typeof (_a = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _a : Object])
], SellerService);
exports.SellerService = SellerService;
//# sourceMappingURL=seller.service.js.map