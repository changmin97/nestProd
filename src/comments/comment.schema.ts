import {  Prop, Schema, SchemaFactory, SchemaOptions,  } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPositive, IsString } from "class-validator";
import { Document, Types, } from "mongoose";

const options: SchemaOptions = {
    timestamps: true,
}

@Schema(options)
export class Comments extends Document {

@ApiProperty({
    description : "작성한 고양이 id",
    required : true
})    
@Prop({
    type: Types.ObjectId, //몽고db단에서는 Types.ObjectId라는 타입이고, 나중에 자동으로 mongodb가 string으로 변환은 해줌
    required: true,
    ref: "cats"      //어떤 documnet랑 연결할건지를 적어주는거
})
@IsNotEmpty()
author: Types.ObjectId

@ApiProperty({
    description : "댓글 내용",
    required : true
})
@Prop({
    required: true,
})
@IsString()
@IsNotEmpty()
contents: string

@ApiProperty({
    description : "좋아요 수",
})    
@Prop({
    default: 0,
})
@IsPositive()
@IsNotEmpty()
likeCount: number

@ApiProperty({
    description : "작성 대상 (어느 고양이에게 댓글남기는지)",
    required : true
    //본인이 본인게시글에 작성할수도있으니까 author와 info가 같을수도있다..
})    
@Prop({
    type: Types.ObjectId, //몽고db단에서는 Types.ObjectId라는 타입이고, 나중에 자동으로 mongodb가 string으로 변환은 해줌
    required: true,
    ref: "cats"      //어떤 documnet랑 연결할건지를 적어주는거
})
@IsNotEmpty()
info: Types.ObjectId


}

export const CommentsSchema = SchemaFactory.createForClass(Comments)
