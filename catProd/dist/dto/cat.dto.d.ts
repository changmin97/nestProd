import { Cat } from "src/cats/cats.schema";
declare const ReadOnlyCatDto_base: import("@nestjs/common").Type<Pick<Cat, "name" | "email">>;
export declare class ReadOnlyCatDto extends ReadOnlyCatDto_base {
    id: string;
}
export {};
