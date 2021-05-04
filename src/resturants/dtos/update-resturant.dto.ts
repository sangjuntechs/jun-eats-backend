import { Field, InputType, PartialType } from '@nestjs/graphql';
import { createResturantDto } from './create-resturant.dto';

@InputType()
export class UpdateResturantInputType extends PartialType(createResturantDto) {}

@InputType()
export class UpdateResturantDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateResturantInputType)
  data: UpdateResturantInputType;
}
