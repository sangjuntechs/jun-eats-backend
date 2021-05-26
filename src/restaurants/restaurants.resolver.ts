/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createRestaurantDto } from './dtos/create-restaurant';
import { UpdateResturantDto } from './dtos/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { ResturantService } from './restaurants.service';

@Resolver(() => Restaurant)
export class ResturantsResolver {
  constructor(private readonly resturantService: ResturantService) {}
  @Query(() => [Restaurant])
  resturants(): Promise<Restaurant[]> {
    return this.resturantService.getAll();
  }
  @Mutation(() => Boolean)
  async createRestaurant(
    @Args('input') createResturantDto: createRestaurantDto,
  ): Promise<boolean> {
    console.log(createResturantDto);
    try {
      await this.resturantService.createResturant(createResturantDto);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  @Mutation((returns) => Boolean)
  async updateResturant(
    @Args('input') UpdateResturantDto: UpdateResturantDto,
  ): Promise<boolean> {
    try {
      await this.resturantService.updateResturant(UpdateResturantDto);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
