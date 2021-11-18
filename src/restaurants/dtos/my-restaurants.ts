/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class MyRestaurantsInput extends PickType(Restaurant, ['id']) {}

@ObjectType()
export class MyRestaurantsOutput extends CoreOutput {
  @Field((type) => Restaurant, { nullable: true })
  restaurant?: Restaurant;
}
