import { InputType, Field, Int } from '@nestjs/graphql'
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsDate,
  IsNumber,
} from 'class-validator'

@InputType()
export class UpdateBrandInput {
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
