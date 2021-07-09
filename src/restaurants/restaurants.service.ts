/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EditProfileOutput } from 'src/users/dtos/edit-profile.dto';
import { User } from 'src/users/entities/user.entity';
import { Raw, Repository } from 'typeorm';
import { AllCategoriesOutput } from './dtos/all-categories.dto';
import { CategoryInput, CategoryOutput } from './dtos/category.dto';
import { CreateDishInput, CreateDishOutput } from './dtos/create-dish.dto';
import {
  CreateRestaurantInput,
  CreateResturantOutput,
} from './dtos/create-restaurant.dto';
import { DeleteDishInput, DeleteDishOutput } from './dtos/delete-dish.dto';
import {
  DeleteRestaurantInput,
  DeleteRestaurantOutput,
} from './dtos/delete-restaurant.dto';
import { EditDishInput, EditDishOutput } from './dtos/edit-dish.dto';
import { EditRestaurantInput } from './dtos/edit-restaurant.dto';
import { RestaurantInput, RestaurantOutput } from './dtos/restaurant.dto';
import { RestaurantsInput, RestaurantsOutput } from './dtos/restaurants.dto';
import {
  SearchRestaurantInput,
  SearchRestaurantOutput,
} from './dtos/search-restaurant.dto';
import { Category } from './entities/category.entity';
import { Dish } from './entities/dish.entity';
import { Restaurant } from './entities/restaurant.entity';
import { CategoryRepository } from './repositories/category.repository';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    private readonly categories: CategoryRepository,
    @InjectRepository(Dish)
    private readonly dishes: Repository<Dish>,
  ) {}

  async createResturant(
    owner: User,
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateResturantOutput> {
    try {
      const newRestaurant = this.restaurants.create(createRestaurantInput);
      newRestaurant.owner = owner;
      const category = await this.categories.getOrCreate(
        createRestaurantInput.categoryName,
      );
      newRestaurant.category = category;
      await this.restaurants.save(newRestaurant);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '식당을 생성할 수 없습니다.',
      };
    }
  }

  async editRestaurant(
    owner: User,
    editRestaurantInput: EditRestaurantInput,
  ): Promise<EditProfileOutput> {
    const restaurant = await this.restaurants.findOneOrFail(
      editRestaurantInput.restaurantId,
    );
    try {
      if (!restaurant) {
        return {
          ok: false,
          error: '식당을 찾을 수 없습니다.',
        };
      }
      if (owner.id !== restaurant.ownerId) {
        return {
          ok: false,
          error: '자신의 식당만 수정할 수 있습니다.',
        };
      }
      let category: Category = null;
      if (editRestaurantInput.categoryName) {
        category = await this.categories.getOrCreate(
          editRestaurantInput.categoryName,
        );
      }
      await this.restaurants.save([
        {
          id: editRestaurantInput.restaurantId,
          ...editRestaurantInput,
          ...(category && { category }),
        },
      ]);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '식당을 찾을 수 없습니다.',
      };
    }
  }

  async deleteRestaurant(
    owner: User,
    deleteRestaurantInput: DeleteRestaurantInput,
  ): Promise<DeleteRestaurantOutput> {
    try {
      const restaurant = await this.restaurants.findOneOrFail(
        deleteRestaurantInput.restaurantId,
      );
      if (!restaurant) {
        return {
          ok: false,
          error: '식당을 찾을 수 없습니다.',
        };
      }
      if (owner.id !== restaurant.ownerId) {
        return {
          ok: false,
          error: '자신의 식당만 삭제할 수 있습니다.',
        };
      }
      await this.restaurants.delete(deleteRestaurantInput.restaurantId);
    } catch (error) {
      return {
        ok: false,
        error: '식당을 삭제할 수 없습니다.',
      };
    }
  }

  async allCategories(): Promise<AllCategoriesOutput> {
    try {
      const categories = await this.categories.find();
      return {
        ok: true,
        categories,
      };
    } catch (error) {
      return {
        ok: false,
        error: '카테고리를 로드할 수 없습니다.',
      };
    }
  }

  countRestaurants(category: Category) {
    return this.restaurants.count({ category });
  }

  async findCategoryBySlug({
    slug,
    page,
  }: CategoryInput): Promise<CategoryOutput> {
    try {
      const category = await this.categories.findOne({ slug });
      if (!category) {
        return {
          ok: false,
          error: '카테고리를 찾을 수 없습니다1.',
        };
      }
      const restaurants = await this.restaurants.find({
        where: {
          category,
        },
        take: 25,
        skip: (page - 1) * 25,
        order: {
          isPromoted: 'DESC',
        },
      });
      const totalResult = await this.countRestaurants(category);
      return {
        ok: true,
        restaurants,
        category,
        totalPages: Math.ceil(totalResult / 25),
      };
    } catch (error) {
      return {
        ok: false,
        error: '카테고리를 찾을 수 없습니다2.',
      };
    }
  }

  async allRestaurants({ page }: RestaurantsInput): Promise<RestaurantsOutput> {
    try {
      const [restaurants, totalResults] = await this.restaurants.findAndCount({
        skip: (page - 1) * 25,
        take: 25,
        order: {
          isPromoted: 'DESC',
        },
      });
      return {
        ok: true,
        results: restaurants,
        totalPages: Math.ceil(totalResults / 25),
        totalResults: totalResults,
      };
    } catch (error) {
      return {
        ok: false,
        error: '식당을 로드할 수 없습니다.',
      };
    }
  }

  async findRestaurantById({
    restaurantId,
  }: RestaurantInput): Promise<RestaurantOutput> {
    try {
      const restaurant = await this.restaurants.findOne(restaurantId, {
        relations: ['menu'],
      });
      if (!restaurant) {
        return {
          ok: false,
          error: '식당을 찾을 수 없습니다.',
        };
      }
      return {
        ok: true,
        restaurant,
      };
    } catch (error) {
      return {
        ok: false,
        error: '식당을 찾을 수 없습니다.',
      };
    }
  }

  async searchRestaurantByName({
    query,
    page,
  }: SearchRestaurantInput): Promise<SearchRestaurantOutput> {
    try {
      const [restaurants, totalResults] = await this.restaurants.findAndCount({
        where: { name: Raw((name) => `${name} ILIKE '%${query}%'`) },
        skip: (page - 1) * 25,
        take: 25,
      });
      return {
        ok: true,
        restaurants,
        totalResults,
        totalPages: Math.ceil(totalResults / 25),
      };
    } catch (error) {
      return {
        ok: false,
        error: '식당을 찾을 수 없습니다.',
      };
    }
  }

  async createDish(
    owner: User,
    createDishInput: CreateDishInput,
  ): Promise<CreateDishOutput> {
    try {
      const restaurant = await this.restaurants.findOne(
        createDishInput.restaurantId,
      );
      if (!restaurant) {
        return {
          ok: false,
          error: '식당을 찾을 수 없습니다.',
        };
      }
      if (owner.id !== restaurant.ownerId) {
        return {
          ok: false,
          error: '본인의 식당이 아닙니다.',
        };
      }
      await this.dishes.save(
        this.dishes.create({ ...createDishInput, restaurant }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '음식을 업로드 할 수 없습니다.',
      };
    }
  }

  async editDish(
    owner: User,
    editDishInput: EditDishInput,
  ): Promise<EditDishOutput> {
    try {
      const dish = await this.dishes.findOne(editDishInput.dishId, {
        relations: ['restaurant'],
      });
      if (!dish) {
        return {
          ok: false,
          error: '음식을 찾을 수 없습니다.',
        };
      }
      if (dish.restaurant.ownerId !== owner.id) {
        return {
          ok: false,
          error: '본인의 식당이 아닙니다.',
        };
      }
      await this.dishes.save([
        {
          id: editDishInput.dishId,
          ...editDishInput,
        },
      ]);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '음식을 수정할 수 없습니다.',
      };
    }
  }

  async deleteDish(
    owner: User,
    { dishId }: DeleteDishInput,
  ): Promise<DeleteDishOutput> {
    try {
      const dish = await this.dishes.findOne(dishId, {
        relations: ['restaurant'],
      });
      if (!dish) {
        return {
          ok: false,
          error: '음식을 찾을 수 없습니다.',
        };
      }
      if (dish.restaurant.ownerId !== owner.id) {
        return {
          ok: false,
          error: '본인의 식당이 아닙니다.',
        };
      }
      await this.dishes.delete(dishId);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '음식을 삭제할 수 없습니다.',
      };
    }
  }
}
