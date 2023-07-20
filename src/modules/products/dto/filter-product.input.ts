import { InputType, Field, Int } from '@nestjs/graphql'
import { OrderByFilterInput } from 'src/utils/filters/OrderByFilterInput'

@InputType()
export class FilterProductInput {
  @Field(() => Int, { nullable: true })
  id!: number

  @Field({ nullable: true })
  name!: string

  @Field({ nullable: true })
  categoryId!: number

  @Field({ nullable: true })
  description!: string

  @Field({ nullable: true })
  brandId!: number

  @Field({ nullable: true })
  country!: number

  @Field({ nullable: true })
  amount!: number

  @Field({ nullable: true })
  warranty!: number

  @Field({ nullable: true })
  typeWarranty!: number

  @Field({ nullable: true })
  material!: number

  @Field({ nullable: true })
  price!: number

  @Field({ nullable: true })
  color!: string

  @Field({ nullable: true })
  measure!: string

  @Field({ nullable: true })
  active!: boolean

  @Field({ nullable: true })
  stock!: number

  @Field({ nullable: true })
  ean!: string

  @Field({ nullable: true })
  ncm!: number

  @Field({ nullable: true })
  cfopSame!: number

  @Field({ nullable: true })
  cfopOther!: number

  @Field({ nullable: true })
  origem!: number

  @Field({ nullable: true })
  csosn!: number

  @Field({ nullable: true })
  unidadeMedida!: string

  @Field({ nullable: true })
  peso!: number

  @Field({ nullable: true })
  largura!: number

  @Field({ nullable: true })
  comprimento!: number

  @Field({ nullable: true })
  altura!: number

  @Field({ nullable: true })
  preEncomenda!: boolean

  @Field({ nullable: true })
  condicao!: string

  @Field({ nullable: true })
  skuPrincipal!: string

  @Field({ nullable: true })
  createdAt!: Date

  @Field({ nullable: true })
  updatedAt!: Date

  @Field({ nullable: true })
  order!: OrderByFilterInput
}
