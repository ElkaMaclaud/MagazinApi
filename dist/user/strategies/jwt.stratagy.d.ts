import { ConfigService } from "@nestjs/config";
interface IInfoPrivate {
    email: string;
}
declare const JwtStratagy_base: new (...args: any[]) => any;
export declare class JwtStratagy extends JwtStratagy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: IInfoPrivate): Promise<string>;
}
export {};
