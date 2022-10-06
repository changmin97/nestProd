/// <reference types="multer" />
import { CatRequestDto } from 'src/dto/cats.request.dto';
import { CatsRepository } from '../cats.repository';
import { Cat } from '../cats.schema';
export declare class CatsService {
    private readonly catsRepository;
    constructor(catsRepository: CatsRepository);
    signUp(body: CatRequestDto): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
    }>;
    uploadImg(cat: Cat, files: Express.Multer.File[]): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
    }>;
    getAllCat(): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
    }[]>;
}
