import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CatRequestDto } from "src/dto/cats.request.dto";
import { Cat } from "./cats.schema";

@Injectable()
export class CatsRepository {
    constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

    async existsByEmail(email: string): Promise<boolean> {
        const result = await this.catModel.exists({ email })
        return !!result
    }

    async create(cat: CatRequestDto): Promise<Cat> {
        return await this.catModel.create(cat)
    }

    async findCatByEmail(email: string): Promise<Cat | null> {
        const cat = await this.catModel.findOne({ email })
        return cat
    }

    async findCatByIdWithoutPassword(catId: string | Types.ObjectId): Promise<Cat | null> {
        const cat = await this.catModel.findById(catId).select('-password') // 만약 email,name만 가져오고 싶으면 .select('email name') 이런식으로 쓰면됨
        return cat
    }

    async findByIdAndUpdateImg(id: string, fileName: string) {
        const cat = await this.catModel.findById(id)

        cat.imgUrl = `http://localhost:8000/media/${fileName}`
        const newCat = await cat.save()
        console.log('repository의 newCat정보',newCat)
        return newCat.readOnlyData
    }

    async findAll() {
        return await this.catModel.find()   
    }
}