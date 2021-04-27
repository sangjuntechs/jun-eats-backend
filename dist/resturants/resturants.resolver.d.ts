import { createResturantDto } from './dtos/create-resturant.dto';
import { Resturant } from './entities/resturant.entity';
export declare class ResturantsResolver {
    resturants(veganOnly: boolean): Resturant[];
    createRetaurant(createResturantDto: createResturantDto): boolean;
}
