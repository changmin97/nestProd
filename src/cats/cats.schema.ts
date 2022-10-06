import {  Prop, Schema, SchemaFactory, SchemaOptions,  } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Document, } from "mongoose";

const options: SchemaOptions = {
    timestamps: true,
}

@Schema(options)
export class Cat extends Document {

@ApiProperty({
    example : "test1@naver.com",
    description : "email",
    required : true
})    
@Prop({
    required: true,
    unique: true
})
@IsEmail()
@IsNotEmpty()
email: string

@ApiProperty({
    example : "test1",
    description : "name",
    required : true
})
@Prop({
    required: true,
})
@IsString()
@IsNotEmpty()
name: string

@ApiProperty({
    example : "asd123",
    description : "password",
    required : true
})
@Prop({
    required: true,
})
@IsString()
@IsNotEmpty()
password: string

@Prop({
    default: "https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg"
})
@IsString()
imgUrl: string

    readonly readOnlyData: {id: string, email: string, name: string, imgUrl: string}
}

export const CatSchema = SchemaFactory.createForClass(Cat)

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
    return {
        id: this.id,
        email: this.email,
        name: this.name,
        imgUrl: this.imgUrl
    }
})