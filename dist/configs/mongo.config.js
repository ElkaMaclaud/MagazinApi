"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoConfig = void 0;
const getMongoConfig = async (configService) => {
    return {
        uri: getMongoConnect(configService),
    };
};
exports.getMongoConfig = getMongoConfig;
const getMongoConnect = (configService) => "mongodb+srv://" +
    configService.get("MONGO_LOGIN") +
    ":" +
    configService.get("MONGO_PASSWORD") +
    "@cluster0.7hhds1a.mongodb.net/magazin";
//# sourceMappingURL=mongo.config.js.map