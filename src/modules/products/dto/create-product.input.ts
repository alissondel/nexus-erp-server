import { InputType, Int, Field } from '@nestjs/graphql'
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsDate,
  IsNumber,
} from 'class-validator'

@InputType()
export class CreateProductInput {
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  name: string

  @IsNumber()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  categoryId: number

  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  description: string

  @IsNumber()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  brandId: number

  @IsNumber()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  country: number

  @IsNumber()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  amount: number

  @IsNumber()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  warranty: number

  @IsNumber()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  typeWarranty: number

  @IsNumber()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  material: number

  @IsNumber()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  price: number

  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  color: string

  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  measure: string

  @IsNumber()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  stock: number

  @IsNumber()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  ean: string

  @IsNumber()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  ncm?: number

  @IsNumber()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  cfopSame?: number

  @IsNumber()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  cfopOther?: number

  @IsNumber()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  origem?: number

  @IsNumber()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  csosn?: number

  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  unidadeMedida: string

  @IsNumber()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  peso: number

  @IsNumber()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  largura: number

  @IsNumber()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  comprimento: number

  @IsNumber()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  altura: number

  @IsBoolean()
  @IsNotEmpty({ message: 'Precisa ser verdadeiro ou falso' })
  @Field({ nullable: true, defaultValue: false })
  preEncomenda: boolean

  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  condicao: string

  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field({ nullable: true })
  skuPrincipal: string

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
