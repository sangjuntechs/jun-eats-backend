/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  createRestaurantInput,
  CreateResturantOutput,
} from './dtos/create-restaurant';
import { Restaurant } from './entities/restaurant.entity';
import { ResturantService } from './restaurants.service';

@Resolver(() => Restaurant)
export class ResturantsResolver {
  constructor(private readonly restaurantService: ResturantService) {}

  @Mutation((returns) => CreateResturantOutput)
  async createRestaurant(
    @AuthUser() authUser: User,
    @Args('input') createRestaurantInput: createRestaurantInput,
  ): Promise<CreateResturantOutput> {
    return this.restaurantService.createResturant(
      authUser,
      createRestaurantInput,
    );
  }
}
