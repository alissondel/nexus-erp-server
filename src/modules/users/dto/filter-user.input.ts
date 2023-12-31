import { Field, InputType, Int } from '@nestjs/graphql'
import { OrderByFilterInput } from 'src/utils/filters/OrderByFilterInput'

@InputType()
export class FilterUserInput {
  @Field(() => Int, { nullable: true })
  id!: number

  @Field({ nullable: true })
  name!: string

  @Field({ nullable: true })
  phoneNumber!: string

  @Field({ nullable: true })
  email!: string

  @Field({ nullable: true })
  password!: string

  @Field({ nullable: true })
  typeUser!: number

  @Field({ nullable: true })
  active!: boolean

  @Field({ nullable: true })
  createdAt!: Date

  @Field({ nullable: true })
  updatedAt!: Date

  @Field({ nullable: true })
  order!: OrderByFilterInput
}
