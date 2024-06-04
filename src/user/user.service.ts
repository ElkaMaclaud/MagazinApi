import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { IInfoPrivate, IUserGood, UserModel } from "./user.model";
import { UserDto } from "./dto/user.dto";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { JwtService } from "@nestjs/jwt";
import { genSalt, hash, compare } from "bcryptjs";
import { AuthDto } from "./dto/auth.dto";
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from "./user.constant";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(dto: AuthDto) {
    const salt = await genSalt(10);try {
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
          address:"",
          pickUpPoin: "",
          choice: ""
        },
      });

      return newUser.save();
    } catch (error) {
      console.error("Ошибка при регистрации пользователя:", error);
    }
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

  async getBasket() {
    this.userModel.aggregate([
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $lookup: {
          from: "Good",
          let: { goodId: { $toString: "$_id" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$$goodId", "$goodId"] },
              },
            },
            {
              $project: {
                basket: 1,
                _id: 0,
              },
            },
          ],
          as: "good",
        },
      },
    ]);
  }
  async getFavorites(id: string) {
    this.userModel.findOne({ id }, { favorite: 1 });
  }

  async getOrders(id: string) {
    this.userModel.findOne({ id }, { order: 1 });
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
  async addBasket(email: string, dto: UserDto) {
    console.log("////////////////", email)
    const updatedUser = await this.userModel.updateOne(
      { "private.email": email 
        
      },
      {
        $inc: { "basket.count": 1 },
        $setOnInsert: { "basket.count": 1 },
        $push: { basket: dto },
      },
      { upsert: true },
    );

    return updatedUser;
  }
  async addFavorites(dto: IUserGood, id: string) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $push: { favorite: dto } },
      { new: true },
    );

    return updatedUser;
  }

  async addOrder(dto: IUserGood, id: string) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $push: { order: dto } },
      { new: true },
    );

    return updatedUser;
  }
  async deleteBasket(id: string, goodId: string) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $pull: { basket: { productId: goodId } } },
      { new: true },
    );

    return updatedUser;
  }
  async deleteFavorites(id: string, goodId: string) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $pull: { favorite: { productId: goodId } } },
      { new: true },
    );

    return updatedUser;
  }
}
