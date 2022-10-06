import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
//AuthGuard에는 strategy를 자동으로 실행시키는 기능이 있다.
@Injectable()
export class jwtAuthGuard extends AuthGuard('jwt') {}