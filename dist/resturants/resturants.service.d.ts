import { Repository } from 'typeorm';
import { Resturant } from './entities/resturant.entity';
export declare class ResturantService {
    private readonly resturants;
    constructor(resturants: Repository<Resturant>);
    getAll(): Promise<Resturant[]>;
}
