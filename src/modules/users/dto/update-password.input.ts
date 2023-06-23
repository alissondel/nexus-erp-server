import { InputType, Field, Int } from '@nestjs/graphql'

@InputType()
export class updatePasswordInput {
  @Field(() => Int, { nullable: false })
  id: number

  @Field({ nullable: false })
  password!: string

  @Field({ nullable: false })
  newPassword!: string

  @Field({ nullable: false })
  confirmNewPassword!: string
}
