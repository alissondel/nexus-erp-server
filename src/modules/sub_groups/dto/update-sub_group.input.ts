import { CreateSubGroupInput } from './create-sub_group.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSubGroupInput extends PartialType(CreateSubGroupInput) {
  @Field(() => Int)
  id: number;
}
