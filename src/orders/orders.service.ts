import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from 'src/restaurants/entities/dish.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orders: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItems: Repository<OrderItem>,
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    @InjectRepository(Dish)
    private readonly dishes: Repository<Dish>,
  ) {}

  async createOrder(
    customer: User,
    { restaurantId, items }: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    const restaurant = await this.restaurants.findOne(restaurantId);
    if (!restaurant) {
      return {
        ok: false,
        error: '식당을 찾을 수 없습니다.',
      };
    }
    for (const item of items) {
      const dish = await this.dishes.findOne(item.dishId);
      if (!dish) {
        // 음식이 없는 경우 작업취소
        return {
          ok: false,
          error: '음식을 찾을 수 없습니다.',
        };
      }
      console.log(`${dish.name}의 가격${dish.price}원`)
      for (const itemOption of item.options) {
        const dishOption = dish.option.find(
          (dishOption) => dishOption.name === itemOption.name,
        );
        if (dishOption) {
          if (dishOption.extra) {
            console.log(`+${dishOption.name}, ${dishOption.extra}원`);
          } else {
            const dishOptionChoice = dishOption.choices.find(
              (optionChoice) => optionChoice.name === itemOption.choice,
            );
            if (dishOptionChoice) {
              if (dishOptionChoice.extra) {
                console.log(
                  `+${dishOptionChoice.name}, ${dishOptionChoice.extra}원`,
                );
              }
            }
          }
        }
      }
      /*await this.orderItems.save(
        this.orderItems.create({
          dish,
          options: item.options,
        }),
      );*/
    }
    /*
    const order = await this.orders.save(
      this.orders.create({
        customer,
        restaurant,
      }),
    );
    console.log(order);
    */
  }
}
