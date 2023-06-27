import { InputType, Field, Int } from '@nestjs/graphql'
import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsNumber,
  IsOptional,
} from 'class-validator'

@InputType()
export class UpdateCityInput {
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  name?: string

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  updatedAt!: Date

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  updatedUser!: number

  @IsNumber()
  @IsNotEmpty({ message: 'Numero Inexistente!' })
  @Field(() => Int)
  stateId?: number
}
