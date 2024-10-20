import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthDto } from "./dto/auth.dto";
import { ALREADY_REGISTERED_ERROR } from "./user.constant";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { UserEmail } from "src/decorators/user-email.decorator";
import { IDelivery } from "./user.model";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("auth/register")
  async register(@Body() dto: AuthDto) {
    const user = await this.userService.findUser(dto.email);
    if (user) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }
    return this.userService.registerUser(dto);
  }

  @HttpCode(200)
  @Post("auth/login")
  async login(@Body() { email: login, password }: AuthDto) {
    const { email } = await this.userService.validateUser(login, password);
    return this.userService.login(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get("basket")
  async getBasket(
    @Req() req,
    @UserEmail() email: string,
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
  ) {
    const options = { offset, limit };
    return this.userService.getBasket(email, options);
  }

  @UseGuards(JwtAuthGuard)
  @Get("favorites")
  async getFavorites(
    @Req() req,
    @UserEmail() email: string,
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
  ) {
    const options = { offset, limit };
    return this.userService.getFavorites(email, options);
  }

  @UseGuards(JwtAuthGuard)
  @Get("orders")
  async getOrders(
    @Req() req,
    @UserEmail() email: string,
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
  ) {
    const options = { offset, limit };
    return this.userService.getOrders(email, options);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("ChooseAll")
  async ChooseAll(
    @Req() req,
    @Body() dto: { on: boolean },
    @UserEmail() email: string,
  ) {
    return this.userService.ChooseAll(email, dto.on);
  }

  @UseGuards(JwtAuthGuard)
  @Get("userData")
  async getUserData(@UserEmail() email: string) {
    return this.userService.getUserData(email);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("updateUserData")
  async updateUserData(
    @Body() dto: { name: string; phone: string },
    @UserEmail() email: string,
  ) {
    const result = this.userService.updateUserData(dto, email);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Patch("changeDelivery")
  async updateDelivery(@Body() dto: IDelivery, @UserEmail() email: string) {
    const result = this.userService.updateDelivery(dto, email);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Delete("deleteSelected")
  async deleteSelected(@Req() req, @UserEmail() email: string) {
    const result = this.userService.deleteSelected(email);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Patch("addBasket")
  async addBasket(
    @Req() req,
    @Body() dto: { id: string },
    @UserEmail() email: string,
  ) {
    const id = dto.id;
    return this.userService.addBasket(email, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("toggleChoice")
  async toggleChoice(
    @Req() req,
    @Body() dto: { id: string },
    @UserEmail() email: string,
  ) {
    const id = dto.id;
    return this.userService.toggleChoice(email, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("toggleFavorites")
  async addFavorites(
    @Req() req,
    @Body() dto: { id: string },
    @UserEmail() email: string,
  ) {
    const id = dto.id;
    return this.userService.toggleFavorites(email, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("buy")
  async addOrder(
    @Req() req,
    @Body() dto: { ids: string[] },
    @UserEmail() email: string,
  ) {
    return this.userService.addOrder(email, dto.ids);
  }

  // @Patch("buy")
  // async buy(@Body() dto: IUserGood) {}

  @UseGuards(JwtAuthGuard)
  @Patch("subBasket")
  async subBasket(
    @Req() req,
    @Body() dto: { id: string },
    @UserEmail() email: string,
  ) {
    const id = dto.id;
    return this.userService.subBasket(email, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("deleteBasket")
  async deleteBasket(
    @Req() req,
    @Body() dto: { id: string },
    @UserEmail() email: string,
  ) {
    const id = dto.id;
    const result = this.userService.deleteBasket(email, id);
    return result;
  }
}
