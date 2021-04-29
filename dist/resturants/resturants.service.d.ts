import { Repository } from 'typeorm';
import { createResturantDto } from './dtos/create-resturant.dto';
import { Resturant } from './entities/resturant.entity';
export declare class ResturantService {
    private readonly resturants;
    constructor(resturants: Repository<Resturant>);
    getAll(): Promise<Resturant[]>;
    createResturant(createResturantDto: createResturantDto): Promise<Resturant>;
}
