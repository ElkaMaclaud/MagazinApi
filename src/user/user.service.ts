import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
	constructor(@InjectModel(UserModel) private readonly user: UserModel) {}

	
}
