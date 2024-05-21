export class AuthDto {
  name?: string;
  email: string;
  phone?: number;
  dataofBirt?: Date;
  password: string;
  role?: "admin" | "user";
}
