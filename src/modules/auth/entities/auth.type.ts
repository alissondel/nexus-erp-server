import { Field, ObjectType } from '@nestjs/graphql'
import { UserEntity } from '../../users/entities/user.entity'

@ObjectType()
export class AuthType {
  @Field(() => UserEntity)
  user: UserEntity

  @Field()
  token: string
}
