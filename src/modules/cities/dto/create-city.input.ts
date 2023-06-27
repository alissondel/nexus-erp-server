import { InputType, Int, Field } from '@nestjs/graphql'
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsDate,
  IsNumber,
} from 'class-validator'

@InputType()
export class CreateCityInput {
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  name: string

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

  @IsNumber()
  @IsNotEmpty({ message: 'Numero Inexistente!' })
  @Field(() => Int)
  stateId: number
}
