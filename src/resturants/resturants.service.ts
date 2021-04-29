import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createResturantDto } from './dtos/create-resturant.dto';
import { Resturant } from './entities/resturant.entity';

@Injectable()
export class ResturantService {
  constructor(
    @InjectRepository(Resturant)
    private readonly resturants: Repository<Resturant>,
  ) {}
  getAll(): Promise<Resturant[]> {
    return this.resturants.find();
  }
  createResturant(createResturantDto: createResturantDto): Promise<Resturant> {
    const newResturant = this.resturants.create(createResturantDto);
    return this.resturants.save(newResturant);
  }
}
