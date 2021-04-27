/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createResturantDto } from './dtos/create-resturant.dto';
import { Resturant } from './entities/resturant.entity';

@Resolver(() => Resturant)
export class ResturantsResolver {
  @Query(() => [Resturant])
  resturants(@Args('veganOnly') veganOnly: boolean): Resturant[] {
    return [];
  }
  @Mutation(() => Boolean)
  createRetaurant(@Args() createResturantDto: createResturantDto): boolean {
    console.log(createResturantDto);
    return true;
  }
}
