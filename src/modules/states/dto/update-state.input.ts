import { InputType, Field, Int } from '@nestjs/graphql'
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

@InputType()
export class UpdateStateInput {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  name?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  uf?: string

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  updatedAt!: Date

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  updatedUser!: number
}
