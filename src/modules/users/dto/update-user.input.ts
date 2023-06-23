import { InputType, Field, Int } from '@nestjs/graphql'

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDate,
  IsOptional,
  IsNumber,
} from 'class-validator'

@InputType()
export class UpdateUserInput {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  name?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  phoneNumber?: string

  @IsOptional()
  @IsEmail()
  @IsNotEmpty({ message: 'Email Invalido!' })
  @Field()
  email?: string

  // @IsOptional()
  // @IsString()
  // @IsNotEmpty({ message: 'Senha é requirida' })
  // @Field({ nullable: true })
  // password?: string

  // @IsOptional()
  // @IsNumber()
  // @IsNotEmpty({ message: 'Precisa ser verdadeiro ou falso' })
  // @Field()
  // typeUser?: number

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  updatedAt!: Date

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  updatedUser!: number
}
