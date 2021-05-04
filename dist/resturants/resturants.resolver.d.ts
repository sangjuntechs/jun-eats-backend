import { createResturantDto } from './dtos/create-resturant.dto';
import { UpdateResturantDto } from './dtos/update-resturant.dto';
import { Resturant } from './entities/resturant.entity';
import { ResturantService } from './resturants.service';
export declare class ResturantsResolver {
    private readonly resturantService;
    constructor(resturantService: ResturantService);
    resturants(): Promise<Resturant[]>;
    createRestaurant(createResturantDto: createResturantDto): Promise<boolean>;
    updateResturant(UpdateResturantDto: UpdateResturantDto): Promise<boolean>;
}
