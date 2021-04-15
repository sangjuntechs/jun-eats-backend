import { Args, Query, Resolver } from '@nestjs/graphql';
import { Resturant } from './entities/resturant.entity';

@Resolver(() => Resturant)
export class ResturantsResolver {
  @Query(() => [Resturant])
  resturants(@Args('veganOnly') veganOnly: boolean): Resturant[] {
    return [];
  }
}
