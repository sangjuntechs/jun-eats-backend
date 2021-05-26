import { Field, InputType, PartialType } from '@nestjs/graphql';
import { createRestaurantDto } from './create-restaurant';

@InputType()
export class UpdateRestaurantInputType extends PartialType(
  createRestaurantDto,
) {}

@InputType()
export class UpdateResturantDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
