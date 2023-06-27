import { InputType, Field, Int } from '@nestjs/graphql'
import { OrderByFilterInput } from 'src/utils/filters/OrderByFilterInput'

@InputType()
export class FilterStateInput {
  @Field(() => Int, { nullable: true })
  id!: number

  @Field({ nullable: true })
  name!: string

  @Field({ nullable: true })
  uf!: string

  @Field({ nullable: true })
  active!: boolean

  @Field({ nullable: true })
  createdAt!: Date

  @Field({ nullable: true })
  updatedAt!: Date

  @Field({ nullable: true })
  order!: OrderByFilterInput
}
