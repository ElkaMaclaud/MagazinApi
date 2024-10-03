"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const ad_validation_constants_1 = require("./ad-validation.constants");
let IdValidationPipe = class IdValidationPipe {
    transform(value, metadata) {
        if (metadata.type != "param") {
            return value;
        }
        if (!mongoose_1.Types.ObjectId.isValid(value)) {
            throw new common_1.BadRequestException(ad_validation_constants_1.ID_VALIDATION_ERROR);
        }
        return value;
    }
};
exports.IdValidationPipe = IdValidationPipe;
exports.IdValidationPipe = IdValidationPipe = __decorate([
    (0, common_1.Injectable)()
], IdValidationPipe);
//# sourceMappingURL=ad-validation.pipe.js.map