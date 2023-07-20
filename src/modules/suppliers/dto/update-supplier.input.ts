import { InputType, Field, Int } from '@nestjs/graphql'
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsDate,
  IsNumber,
  IsEmail,
} from 'class-validator'

@InputType()
export class UpdateSupplierInput {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  name?: string

  @IsOptional()
  @IsEmail()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  email?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  phoneNumber?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  cnpj?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  address?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  addressNumber?: number

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  district?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  cep?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  categorySupplier: string

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  updatedAt!: Date

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  updatedUser!: number
}
