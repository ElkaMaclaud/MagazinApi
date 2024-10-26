import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
interface IInfoPrivate {
    email: string;
}
declare const JwtStratagy_base: new (...args: any[]) => Strategy;
export declare class JwtStratagy extends JwtStratagy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: IInfoPrivate): Promise<string>;
}
export {};
