import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
