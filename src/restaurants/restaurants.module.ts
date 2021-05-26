import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { ResturantsResolver } from './restaurants.resolver';
import { ResturantService } from './restaurants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  providers: [ResturantsResolver, ResturantService],
})
export class ResturantsModule {}
