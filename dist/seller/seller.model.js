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
exports.SellerModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const mongoose_1 = require("mongoose");
class SellerModel extends defaultClasses_1.TimeStamps {
}
__decorate([
    (0, typegoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SellerModel.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], SellerModel.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], SellerModel.prototype, "phone", void 0);
__decorate([
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], SellerModel.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], SellerModel.prototype, "rating", void 0);
__decorate([
    (0, typegoose_1.Prop)([
        {
            text: String,
            rating: Number,
            createdAt: { type: Date, default: Date.now },
        },
    ]),
    __metadata("design:type", Array)
], SellerModel.prototype, "reviews", void 0);
__decorate([
    (0, typegoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], SellerModel.prototype, "createdAt", void 0);
__decorate([
    (0, typegoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], SellerModel.prototype, "updatedAt", void 0);
__decorate([
    (0, typegoose_1.Prop)([{ type: mongoose_1.Types.ObjectId, ref: 'Good' }]),
    __metadata("design:type", Array)
], SellerModel.prototype, "products", void 0);
__decorate([
    (0, typegoose_1.Prop)({ enum: ['active', 'suspended', 'deleted'], default: 'active' }),
    __metadata("design:type", String)
], SellerModel.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.Prop)({ type: Map, of: String }),
    __metadata("design:type", Map)
], SellerModel.prototype, "socialMediaLinks", void 0);
__decorate([
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], SellerModel.prototype, "image", void 0);
__decorate([
    (0, typegoose_1.Prop)([{ type: mongoose_1.Types.ObjectId, ref: 'Chat' }]),
    __metadata("design:type", Array)
], SellerModel.prototype, "chats", void 0);
exports.SellerModel = SellerModel;
//# sourceMappingURL=seller.model.js.map