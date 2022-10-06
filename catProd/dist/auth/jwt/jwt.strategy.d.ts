import { Strategy } from "passport-jwt";
import { CatsRepository } from "src/cats/cats.repository";
import { Payload } from "./jwt.payload";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly catsRepository;
    constructor(catsRepository: CatsRepository);
    validate(payload: Payload): Promise<import("../../cats/cats.schema").Cat>;
}
export {};
