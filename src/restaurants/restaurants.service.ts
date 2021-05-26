import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  createRestaurantInput,
  CreateResturantOutput,
} from './dtos/create-restaurant';
import { Category } from './entities/category.entity';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class ResturantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly resturants: Repository<Restaurant>,
    @InjectRepository(Category)
    private readonly categories: Repository<Category>,
  ) {}

  async createResturant(
    owner: User,
    createRestaurantInput: createRestaurantInput,
  ): Promise<CreateResturantOutput> {
    try {
      const newRestaurant = this.resturants.create(createRestaurantInput);
      newRestaurant.owner = owner;
      const CategoryName = createRestaurantInput.categoryName
        .trim()
        .toLowerCase();
      const categorySlug = CategoryName.replace(/ /g, '-');
      let category = await this.categories.findOne({ slug: categorySlug });
      if (!category) {
        category = await this.categories.save(
          this.categories.create({ slug: categorySlug, name: CategoryName }),
        );
      }
      newRestaurant.category = category;
      await this.resturants.save(newRestaurant);
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
}
