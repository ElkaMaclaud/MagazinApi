import { ConfigService } from "@nestjs/config";
import { TypegooseModuleOptions } from "nestjs-typegoose";

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoConnect(configService),
  };
};

const getMongoConnect = (configService: ConfigService) =>
  "mongodb+srv://" +
  configService.get("MONGO_LOGIN") +
  ":" +
  configService.get("MONGO_PASSWORD") +
  "@cluster0.hmhqyqx.mongodb.net/magazin-api";
