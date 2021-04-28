/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createResturantDto } from './dtos/create-resturant.dto';
import { Resturant } from './entities/resturant.entity';
import { ResturantService } from './resturants.service';

@Resolver(() => Resturant)
export class ResturantsResolver {
  constructor(private readonly resturantService: ResturantService) {}
  @Query(() => [Resturant])
  resturants(): Promise<Resturant[]> {
    return this.resturantService.getAll();
  }
  @Mutation(() => Boolean)
  createRestaurant(@Args() createResturantDto: createResturantDto): boolean {
    console.log(createResturantDto);
    return true;
  }
}
