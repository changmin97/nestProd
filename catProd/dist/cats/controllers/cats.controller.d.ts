/// <reference types="multer" />
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { CatRequestDto } from 'src/dto/cats.request.dto';
import { Cat } from '../cats.schema';
import { CatsService } from '../services/cats.service';
export declare class CatsController {
    private readonly catsService;
    private readonly authService;
    constructor(catsService: CatsService, authService: AuthService);
    getCurrentCat(cat: any): any;
    signUp(body: CatRequestDto): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
    }>;
    logIn(data: LoginRequestDto): Promise<{
        token: string;
    }>;
    logOut(): string;
    uploadFile(files: Array<Express.Multer.File>, cat: Cat): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
    }>;
    getallCat(): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
    }[]>;
}
