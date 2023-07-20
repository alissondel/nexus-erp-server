import { InputType, Field, Int } from '@nestjs/graphql'
import { OrderByFilterInput } from 'src/utils/filters/OrderByFilterInput'

@InputType()
export class FilterSupplierInput {
  @Field(() => Int, { nullable: true })
  id!: number

  @Field({ nullable: true })
  name!: string

  @Field({ nullable: true })
  email!: string

  @Field({ nullable: true })
  phoneNumber!: string

  @Field({ nullable: true })
  cnpj!: string

  @Field({ nullable: true })
  address!: string

  @Field({ nullable: true })
  addressNumber!: number

  @Field({ nullable: true })
  district!: string

  @Field({ nullable: true })
  cep!: string

  @Field({ nullable: true })
  categorySupplier!: string

  @Field({ nullable: true })
  active!: boolean

  @Field({ nullable: true })
  createdAt!: Date

  @Field({ nullable: true })
  updatedAt!: Date

  @Field({ nullable: true })
  order!: OrderByFilterInput
}
