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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
class GoodCharacteristic {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], GoodCharacteristic.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], GoodCharacteristic.prototype, "value", void 0);
class GoodModel extends defaultClasses_1.TimeStamps {
}
exports.GoodModel = GoodModel;
__decorate([
    (0, typegoose_1.prop)({ type: () => [String] }),
    __metadata("design:type", Array)
], GoodModel.prototype, "image", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], GoodModel.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], GoodModel.prototype, "oldPrice", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], GoodModel.prototype, "brand", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], GoodModel.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], GoodModel.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], GoodModel.prototype, "category", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Object)
], GoodModel.prototype, "characteristics", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Boolean)
], GoodModel.prototype, "sale", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Boolean)
], GoodModel.prototype, "discount", void 0);
//# sourceMappingURL=good.model.js.map