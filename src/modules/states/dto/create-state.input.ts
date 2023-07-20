import { InputType, Field, Int } from '@nestjs/graphql'
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator'

@InputType()
export class CreateStateInput {
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  name: string

  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  uf: string

  @IsBoolean()
  @IsNotEmpty({ message: 'Precisa ser verdadeiro ou falso' })
  @Field({ nullable: true, defaultValue: true })
  active!: boolean

  @IsDate()
  @Field({ nullable: true })
  createdAt!: Date

  @IsNumber()
  @Field(() => Int, { nullable: true })
  createdUser!: number
}
