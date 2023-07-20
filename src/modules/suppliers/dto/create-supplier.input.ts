import { InputType, Int, Field } from '@nestjs/graphql'
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsDate,
  IsNumber,
  IsEmail,
} from 'class-validator'

@InputType()
export class CreateSupplierInput {
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  name: string

  @IsEmail()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  email: string

  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  phoneNumber: string

  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  cnpj: string

  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  address: string

  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  addressNumber: number

  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  district: string

  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  cep: string

  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  categorySupplier: string

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
