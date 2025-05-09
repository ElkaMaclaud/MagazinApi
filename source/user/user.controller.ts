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
import { UserEmail } from "source/decorators/user-email.decorator";
import { IDelivery } from "./user.model";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

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
  @Get("cart")
  async getCart(
    @UserEmail() email: string,
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
  ) {
    const options = { offset, limit };
    return this.userService.getCart(email, options);
  }

  @UseGuards(JwtAuthGuard)
  @Get("favorites")
  async getFavorites(
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
    @UserEmail() email: string,
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
  ) {
    const options = { offset, limit };
    return this.userService.getOrders(email, options);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("selectAll")
  async selectAll(
    @Body() dto: { on: boolean },
    @UserEmail() email: string,
  ) {
    return this.userService.selectAll(email, dto.on);
  }


  @UseGuards(JwtAuthGuard)
  @Get("getAllChats")
  async getAllChats(@UserEmail() email: string,) {
      return this.userService.getAllChats(email);
  }

  @UseGuards(JwtAuthGuard)
  @Post("createNewChat")
  async createNewChat(@Body () dto: { userId: string, title: string }, @UserEmail() email: string) {
      return this.userService.createNewChat(dto);
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
  async deleteSelected(@UserEmail() email: string) {
    const result = this.userService.deleteSelected(email);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Patch("cart")
  async addToCart(
    @Body() dto: { id: string },
    @UserEmail() email: string,
  ) {
    const id = dto.id;
    return this.userService.addToCart(id, email);
  }

  @Patch("addToCartGetAuto")
  async addToCartGetAuto(
    @Body() dto: { id: string },
  ) {
    const id = dto.id;
    return this.userService.addToCart(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("toggleSelect")
  async toggleSelect(
    @Body() dto: { id: string },
    @UserEmail() email: string,
  ) {
    const id = dto.id;
    return this.userService.toggleSelect(email, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("toggleFavorites")
  async addFavorites(
    @Body() dto: { id: string },
    @UserEmail() email: string,
  ) {
    const id = dto.id;
    return this.userService.toggleFavorites(id, email);
  }

  @Patch("toggleFavoritesGetAuto")
  async toggleFavoritesGetAuto(
    @Body() dto: { id: string },
  ) {
    const id = dto.id;
    return this.userService.toggleFavorites(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("buy")
  async addOrder(
    @Body() dto: { ids: string[] },
    @UserEmail() email: string,
  ) {
    return this.userService.addOrder(email, dto.ids);
  }

  // @Patch("buy")
  // async buy(@Body() dto: IUserGood) {}

  @UseGuards(JwtAuthGuard)
  @Patch("subFromCart")
  async subFromCart(
    @Body() dto: { id: string },
    @UserEmail() email: string,
  ) {
    const id = dto.id;
    return this.userService.subFromCart(email, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("removeFromCart")
  async removeFromCart(
    @Body() dto: { id: string },
    @UserEmail() email: string,
  ) {
    const id = dto.id;
    const result = this.userService.removeFromCart(email, id);
    return result;
  }
}
