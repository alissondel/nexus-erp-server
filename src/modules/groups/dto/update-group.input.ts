import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsDate,
  IsNumber,
} from 'class-validator'
import { CreateGroupInput } from './create-group.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateGroupInput extends PartialType(CreateGroupInput) {
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
