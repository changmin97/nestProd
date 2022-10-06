import { ApiProperty, PickType } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { Cat } from "src/cats/cats.schema"

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
    @ApiProperty({
        example : "63331911k63f02afd1836a5h",
        description : "id"
    })
    id: string
}
  