import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CatsModule } from 'src/cats/cats.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    //PassportModule에서는 나중에 만들 strategy에 대해서 설정할수있음
    PassportModule.register({ defaultStrategy: "jwt", session: false}),
    //아래 코드는 로그인할때 쓰임
    JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: "1y" },
  }),
  forwardRef(() => CatsModule)
  
],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
