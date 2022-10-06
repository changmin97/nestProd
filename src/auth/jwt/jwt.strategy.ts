import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { CatsRepository } from "src/cats/cats.repository";
import { Payload } from "./jwt.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly catsRepository: CatsRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            ignoreExpiration: false,
        })
    }

    async validate(payload: Payload){ // 프론트에서 jwt 보내는거 유효성검사하는 함수(나중에)
        const cat = await this.catsRepository.findCatByIdWithoutPassword(
            payload.sub, //CatId는 payload의 sub에 있음 
        )

        if(cat) {
            return cat //존재하면 request.user로 cat정보 보냄
        }else {
            throw new UnauthorizedException('접근 오류')
        }
    }

}