import { createResturantDto } from './dtos/create-resturant.dto';
import { Resturant } from './entities/resturant.entity';
export declare class ResturantsResolver {
    resturants(veganOnly: boolean): Resturant[];
    createRestaurant(createResturantDto: createResturantDto): boolean;
}
