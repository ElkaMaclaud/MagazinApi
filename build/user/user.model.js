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
exports.UserModel = exports.IDelivery = exports.IInfoPrivate = exports.IInfoPublik = exports.IUserGood = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
class IUserGood {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], IUserGood.prototype, "goodId", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], IUserGood.prototype, "count", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Boolean)
], IUserGood.prototype, "favorite", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], IUserGood.prototype, "choice", void 0);
exports.IUserGood = IUserGood;
class IInfoPublik {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], IInfoPublik.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], IInfoPublik.prototype, "city", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], IInfoPublik.prototype, "age", void 0);
exports.IInfoPublik = IInfoPublik;
class IInfoPrivate {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], IInfoPrivate.prototype, "phone", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], IInfoPrivate.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], IInfoPrivate.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], IInfoPrivate.prototype, "gender", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], IInfoPrivate.prototype, "passwordHash", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], IInfoPrivate.prototype, "role", void 0);
exports.IInfoPrivate = IInfoPrivate;
class IDelivery {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], IDelivery.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], IDelivery.prototype, "pickUpPoin", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], IDelivery.prototype, "choice", void 0);
exports.IDelivery = IDelivery;
class UserModel extends defaultClasses_1.TimeStamps {
}
__decorate([
    (0, typegoose_1.prop)({ type: () => IInfoPublik }),
    __metadata("design:type", IInfoPublik)
], UserModel.prototype, "publik", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => IInfoPrivate }),
    __metadata("design:type", IInfoPrivate)
], UserModel.prototype, "privates", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [String] }),
    __metadata("design:type", Array)
], UserModel.prototype, "favorites", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [IUserGood] }),
    __metadata("design:type", Array)
], UserModel.prototype, "basket", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [String] }),
    __metadata("design:type", Array)
], UserModel.prototype, "order", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => IDelivery }),
    __metadata("design:type", IDelivery)
], UserModel.prototype, "delivery", void 0);
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map