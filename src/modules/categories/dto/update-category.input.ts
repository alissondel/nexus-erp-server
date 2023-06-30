import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsDate,
  IsNumber,
} from 'class-validator'
import { InputType, Field, Int } from '@nestjs/graphql'

@InputType()
export class UpdateCategoryInput {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  description?: string

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  updatedAt!: Date

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  updatedUser!: number
}
