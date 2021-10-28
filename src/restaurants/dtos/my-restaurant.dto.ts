/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Restaurant } from '../entities/restaurant.entity';

@ObjectType()
export class MyRestaurantOutput extends CoreOutput {
  @Field((type) => [Restaurant])
  restaurants?: Restaurant[];
}
