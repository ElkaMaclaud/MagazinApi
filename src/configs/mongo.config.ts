import { ConfigService } from "@nestjs/config";
import { TypegooseModuleOptions } from "nestjs-typegoose";

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoConnect(configService),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  };
};

const getMongoConnect = (configService: ConfigService) =>
  "mongodb+srv://" +
  configService.get("MONGO_LOGIN") +
  ":" +
  configService.get("MONGO_PASSWORD") +
  "@cluster0.7hhds1a.mongodb.net/magazin";
