import { Model, Types } from "mongoose";
import { CatRequestDto } from "src/dto/cats.request.dto";
import { Cat } from "./cats.schema";
export declare class CatsRepository {
    private readonly catModel;
    constructor(catModel: Model<Cat>);
    existsByEmail(email: string): Promise<boolean>;
    create(cat: CatRequestDto): Promise<Cat>;
    findCatByEmail(email: string): Promise<Cat | null>;
    findCatByIdWithoutPassword(catId: string | Types.ObjectId): Promise<Cat | null>;
    findByIdAndUpdateImg(id: string, fileName: string): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
    }>;
    findAll(): Promise<(Cat & {
        _id: Types.ObjectId;
    })[]>;
}
