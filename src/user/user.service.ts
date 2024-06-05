import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { IInfoPrivate, IUserGood, UserModel } from "./user.model";
import { UserDto } from "./dto/user.dto";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { JwtService } from "@nestjs/jwt";
import { genSalt, hash, compare } from "bcryptjs";
import { AuthDto } from "./dto/auth.dto";
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from "./user.constant";
import { GoodModel } from "src/good/good.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
    @InjectModel(GoodModel) private readonly goodModel: ModelType<GoodModel>,
  ) {}

  async registerUser(dto: AuthDto) {
    const salt = await genSalt(10);
    const newUser = await this.userModel.create({
      publik: {
        name: dto.name,
        city: "",
        age: "",
      },
      private: {
        phone: dto.phone || "",
        dataofBirt: dto.dataofBirth || "",
        role: "user",
        email: dto.email,
        passwordHash: await hash(dto.password, salt),
      },
      favorite: [],
      basket: [],
      order: [],
      delivery: {
        address: "",
        pickUpPoin: "",
        choice: "",
      },
    });
    return newUser.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ "private.email": email }).exec();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<IInfoPrivate, "email">> {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const isCorrectPassword = await compare(
      password,
      user.private.passwordHash,
    );
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return { email: user.private.email };
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async create(dto: UserDto) {
    this.userModel.create(dto);
  }

  // Костыльная реализация - необходимо исправить в будущем на сложную агрегацию
  // Данный метод плох тем, что делает 2 запроса к бд
  // Первый запрос идет на получение записи из юзера и затем делает ещё один запрос к записям Good для соотнесения данных
  // Необходимо ПЕРЕДЕЛАТЬ В БУДУЩЕМ!!!
  async getData(email: string, field: string) {
    const user = await this.userModel
      .findOne({ "private.email": email }, { [field]: 1 })
      .exec();
    if (!user || !user[field] || user[field].length === 0) {
      return [];
    }

    const arrItems = await this.goodModel
      .find({ _id: { $in: user[field].map((item) => item.goodId) } })
      .exec();

    const result = arrItems.map((item) => {
      const userData = user[field].find(
        (i) => item._id.toString() === i.goodId,
      );
      return {
        ...item.toObject(),
        count: userData.count,
        favorite: userData.favorite,
      };
    });
    return result;
  }

  async getBasket(email: string) {
    return this.getData(email, "basket");
  }

  async getFavorites(email: string) {
    return this.getData(email, "favorite");
  }

  async getOrders(email: string) {
    return this.getData(email, "order");
  }

  async getUserData(id: string) {
    this.userModel.findOne({ id }, { publik: 1, private: 1, delivery: 1 });
  }
  async updateUserData(dto: UserDto, id: string) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          publik: dto.publik,
          private: dto.private,
          delivery: dto.delivery,
        },
      },
      { new: true },
    );

    return updatedUser;
  }

  // Костыльная реализация - необходимо исправить в будущем на сложную агрегацию
  // Данный метод как и метод получения определенных полей плох тем, что делает 2 запроса к бд
  // Сначала делает запрос на получение и только, исходя из результата делает второй запрос на обновление
  // ОБЯЗАТЕЛЬНО ИСПРАВИТЬ ЭТО БЕЗОБРАЗИЕ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  async addGood(email: string, id: string, field: string) {
    const query = { "private.email": email };
    query[`${field}.goodId`] = id;
    const existingItem = await this.userModel.findOne(query);
    if (existingItem) {
      field === "favorite" && this.deleteGood(email, id, field);
      const updateField = `${field}.goodId`;
      return await this.userModel.updateOne(
        { "private.email": email, [updateField]: id },
        {
          $inc: {
            [`${field}.$.count`]: 1,
          },
        },
      );
    } else {
      return await this.userModel.updateOne(
        { "private.email": email },
        {
          $push: {
            [field]: {
              $each: [
                {
                  goodId: id,
                  count: 1,
                  favorite: field === "favorite" ? true : existingItem.favorite,
                },
              ],
              $position: 0,
            },
          },
        },
        { upsert: true },
      );
    }
  }
  // Снова костыль - избавиться  в будущем
  async subGood(email: string, id: string, field: string) {
    const query = { "private.email": email, [`${field}.goodId`]: id };
    const existingItem = await this.userModel.findOne(query);

    if (existingItem) {
      if (existingItem[field].find((i) => i.goodId === id).count > 1) {
        return await this.userModel.updateOne(
          { "private.email": email, [`${field}.goodId`]: id },
          { $inc: { [`${field}.$.count`]: -1 } },
        );
      } else {
        return await this.userModel.updateOne(
          { "private.email": email },
          { $pull: { [field]: { goodId: id } } },
        );
      }
    }
  }

  async deleteGood(email: string, id: string, field: string) {
    return await this.userModel.updateOne(
      { "private.email": email },
      { $pull: { [field]: { goodId: id } } },
    );
  }

  async addBasket(email: string, id: string) {
    return this.addGood(email, id, "basket");
  }
  async toggleFavorites(email: string, id: string) {
    return this.addGood(email, id, "favorite");
  }
  async addOrder(email: string, id: string) {
    return await this.userModel.updateOne(
      { "private.email": email },
      { $push: { order: { goodId: id } } },
    );
  }
  async subBasket(email: string, id: string) {
    return this.subGood(email, id, "basket");
  }
  async deleteBasket(email: string, id: string) {
    return this.deleteGood(email, id, "basket");
  }
}

// async getBasket(email: string) {
//     return (await this.userModel
//       .aggregate([
//         {
//           $match: { "private.email": email }, // Найти пользователя по адресу электронной почты
//         },
//         {
//           $lookup: {
//             from: "Good",
//             let: { goodId: { $toString: "$_id" } }, // Преобразовать _id в строку для сравнения
//             pipeline: [
//               {
//                 $match: {
//                   $expr: { $eq: ["$$goodId", "$goodId"] },
//                 },
//               },
//             ],
//             as: "matchedGood",
//           },
//         },
//         {
//           $addFields: {
//             "matchedGood.count": "$basket.count", // Добавить поле "count" из корзины к каждому найденному товару из "Good"
//           },
//         },
//         {
//           $group: {
//             _id: "$_id", // Группировка по исходному _id
//             basket: { $push: "$matchedGood" }, // Формирование массива "basket" с найденными товарами из "Good" и полями из корзины
//           },
//         },
//         {
//           $project: {
//             _id: 0, // Исключить поле _id
//             basket: { $arrayElemAt: ["$basket", 0] }, // Выбрать первый элемент массива "basket"
//           },
//         },
//         {
//           $unwind: "$basket", // Развернуть массив "basket" с товарами из "Good"
//         },
//       ])
//       .exec()) as IUserGood[];
