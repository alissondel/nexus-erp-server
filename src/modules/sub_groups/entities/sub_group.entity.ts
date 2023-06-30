import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SubGroup {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
