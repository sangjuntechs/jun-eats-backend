import { InputType, OmitType } from '@nestjs/graphql';
import { Resturant } from '../entities/resturant.entity';

@InputType()
export class createResturantDto extends OmitType(Resturant, ['id']) {}
