import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatRequestDto } from 'src/dto/cats.request.dto';
import * as bcrypt from 'bcrypt'
import { CatsRepository } from '../cats.repository';
import { Cat } from '../cats.schema';

@Injectable()
export class CatsService {
    constructor(private readonly catsRepository: CatsRepository) {}

    async signUp(body: CatRequestDto) {
        const { email, name, password } = body
        const isCatExist = await this.catsRepository.existsByEmail( email )

        if(isCatExist){
            throw new HttpException('해당하는 이메일은 이미 존재합니다.', 403)
            //이거와 같음. throw new UnauthorizedException('해당하는 이메일은 이미 존재합니다.')
        }
   
        const hashedPassword = await bcrypt.hash(password, 10)

        const cat = await this.catsRepository.create({
            email,
            name,
            password: hashedPassword,
        })

        return cat.readOnlyData
    }

    async uploadImg(cat: Cat, files: Express.Multer.File[]) {
        const fileName = `cats/${files[0].filename}`

        console.log(fileName)
        const newCat = await this.catsRepository.findByIdAndUpdateImg(
            cat.id,
            fileName,
        )
        console.log(newCat)
        return newCat
    }

    async getAllCat() {
        const allCat = await this.catsRepository.findAll()
        const readOnlyCats = allCat.map((cat)=> cat.readOnlyData) //각각의 virtual field데이터들을 가져오겠다는뜻
        return readOnlyCats
    }

}

