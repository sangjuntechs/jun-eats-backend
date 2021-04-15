import { Query, Resolver } from '@nestjs/graphql';
import { Resturant } from './entities/resturant.entity';

@Resolver(() => Resturant)
export class ResturantsResolver {
  @Query(() => Resturant)
  myResturant() {
    return true;
  }
}
