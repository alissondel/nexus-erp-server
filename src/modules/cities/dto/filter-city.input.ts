import { InputType, Int, Field } from '@nestjs/graphql'
import { OrderByFilterInput } from 'src/utils/filters/OrderByFilterInput'

@InputType()
export class FilterCityInput {
  @Field(() => Int, { nullable: true })
  id!: number

  @Field({ nullable: true })
  name!: string

  @Field({ nullable: true })
  active!: boolean

  @Field({ nullable: true })
  stateId!: number

  @Field({ nullable: true })
  state!: string

  @Field({ nullable: true })
  createdAt!: Date

  @Field({ nullable: true })
  updatedAt!: Date

  @Field({ nullable: true })
  order!: OrderByFilterInput
}
