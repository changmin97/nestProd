import { HttpException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class PositiveIntPipe implements PipeTransform {
    transform(value: number) {

        if( value < 0 ){
            throw new HttpException('id값은 0보다 커야 합니다.', 400)
        }
        return value
    }
}