import { Cat } from "src/cats/cats.schema";
declare const LoginRequestDto_base: import("@nestjs/common").Type<Pick<Cat, "email" | "password">>;
export declare class LoginRequestDto extends LoginRequestDto_base {
}
export {};
