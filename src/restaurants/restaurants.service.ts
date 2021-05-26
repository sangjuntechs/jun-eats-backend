import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createRestaurantDto } from './dtos/create-restaurant';
import { UpdateResturantDto } from './dtos/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class ResturantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly resturants: Repository<Restaurant>,
  ) {}
  getAll(): Promise<Restaurant[]> {
    return this.resturants.find();
  }
  createResturant(
    createRestaurantDto: createRestaurantDto,
  ): Promise<Restaurant> {
    const newRestaurant = this.resturants.create(createRestaurantDto);
    return this.resturants.save(newRestaurant);
  }
  updateResturant({ id, data }: UpdateResturantDto) {
    return this.resturants.update(id, { ...data });
  }
}
