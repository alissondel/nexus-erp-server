import { InputType, Int, Field } from '@nestjs/graphql'
import { OrderByFilterInput } from 'src/utils/filters/OrderByFilterInput'

@InputType()
export class FilterSubGroupInput {
  @Field(() => Int, { nullable: true })
  id!: number

  @Field({ nullable: true })
  description!: string

  @Field({ nullable: true })
  active!: boolean

  @Field({ nullable: true })
  createdAt!: Date

  @Field({ nullable: true })
  updatedAt!: Date

  @Field({ nullable: true })
  order!: OrderByFilterInput
}
