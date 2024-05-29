import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { IUserGood, UserModel } from './user.model';
import { UserDto } from './dto/user.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
  ) {}

  async getBasket(id: string) {
    this.userModel.findOne({ id });
  }
  async getFavorites(id: string) {
    this.userModel.findOne({ id });
  }

  async getOrders(id: string) {
    this.userModel.findOne({ id });
  }

  async getUserData(id: string) {
    //Агрегация - нужно будет доставать поля: publik, private и delivery
    this.userModel; // дописать
  }
  async addFavorites(dto: IUserGood, id: string) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $push: { favorite: dto } },
      { new: true },
    );

    return updatedUser;
  }
  async addBasket(dto: IUserGood, id: string) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $push: { basket: dto } },
      { new: true },
    );

    return updatedUser;
  }
}
