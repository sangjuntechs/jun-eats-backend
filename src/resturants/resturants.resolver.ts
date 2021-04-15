import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ResturantsResolver {
  @Query(() => Boolean)
  pizza(): boolean {
    return true;
  }
}
