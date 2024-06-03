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

  async create(dto: UserDto) {
    this.userModel.create(dto);
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
  async addBasket(dto: IUserGood, id: string) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $push: { basket: dto } },
      { new: true },
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
