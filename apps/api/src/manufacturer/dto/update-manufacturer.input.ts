import { CreateManufacturerInput } from './create-manufacturer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateManufacturerInput extends PartialType(CreateManufacturerInput) {
  @Field(() => Int)
  id: number;
}
