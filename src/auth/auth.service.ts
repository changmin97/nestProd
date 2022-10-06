import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly catsRepository: CatsRepository,
        private jwtService: JwtService, // 의존성 주입 가능한 이유는 auth.module.ts안에 JwtModule에서 제공해주는 공급자이기에.
        ) {}

    async jwtLogIn(data: LoginRequestDto) {
        const { email, password } = data
        //해당하는 email이 있는지 
        const cat = await this.catsRepository.findCatByEmail(email)

        if(!cat) {
            throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.')
        }

        const isPasswordvalidated: boolean = await bcrypt.compare( // compare함수는 Promise를 return하기에await 붙여줌
            password,
            cat.password,
        )

        if(!isPasswordvalidated){
            throw new UnauthorizedException("이메일과 비밀번호를 확인해주세요.")
        }

        //유효성 검사 다 통과하면 jwt를 만들어서 프론트한테 보내줘야함
        //만들기위해서는 @nestjs/jwt에서 제공하는 JwtService내의 메소드 사용해야함

        const payload = { email: email, sub: cat.id }//sub는 토큰 제목을 의미
        return {
            token: this.jwtService.sign(payload)
        }

    }
}
