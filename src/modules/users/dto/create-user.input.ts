import { InputType, Int, Field } from '@nestjs/graphql'

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsDate,
  IsNumber,
} from 'class-validator'

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  name: string

  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  phoneNumber: string

  @IsEmail()
  @IsNotEmpty({ message: 'Email Invalido!' })
  @Field()
  email: string

  @IsString()
  @IsNotEmpty({ message: 'Senha é requirida' })
  @Field({ nullable: true })
  password: string

  // @IsNumber()
  // @IsNotEmpty({ message: 'Tipo de Usuário é requirido' })
  // @Field({ nullable: false })
  // typeUser?: number

  @IsNumber()
  @IsNotEmpty({ message: 'Código da cidade é Inexistente!' })
  @Field(() => Int)
  cityId: number

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
