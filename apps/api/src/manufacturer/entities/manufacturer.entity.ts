import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Manufacturer {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
