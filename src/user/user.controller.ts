import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { ConfigService } from "@nestjs/config";
import { SuccessResponse } from "src/helpers/success.response";

@Controller("user")
export class UserController {
  //constructor(private readonly configService: ConfigService) {}
  @Post("create")
  async create(@Body() dto: UserDto) {}

  @Delete(":id")
  async delete(@Param("id") id: string) {}

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UserDto) {}
}
