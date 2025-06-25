import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserCoreService } from 'src/Core/user-core/user-core.service';
import { FoodCoreService } from 'src/Core/food-core/food-core.service';
import { OrderCoreService } from 'src/Core/order-core/order-core.service';

@Injectable()
export class OrderService {
  constructor (
    private readonly usercoreservice : UserCoreService,
    private readonly foodcoreservice : FoodCoreService,
    private readonly ordercoreservice : OrderCoreService
  ){}


  async placeOrder(dto: CreateOrderDto) {
  const { userId, address, payment } = dto;

  // 1. Find user
  const user = await this.usercoreservice.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  const cartData = user.cartData || {};
  const foodIds = Object.keys(cartData);
  if (foodIds.length === 0) {
    throw new BadRequestException('Cart is empty');
  }

  // 2. Get food items
  const foods = await this.foodcoreservice.findMany({
    where: {
      id: { in: foodIds },
      isDeleted: false,
      status: 'ENABLED',
    },
  });

  // 3. Build items and amount
  const items: {
    foodId: string;
    name: string;
    price: number;
    quantity: number;
    image: string | null;
    total: number;
  }[] = [];

  let amount = 0;

  for (const food of foods) {
    const quantity = cartData[food.id];
    const total = quantity * food.price;

    items.push({
      foodId: food.id,
      name: food.name,
      price: food.price,
      quantity,
      image: food.image || '',
      total,
    });

    amount += total;
  }

  // 4. Create order
  const order = await this.ordercoreservice.create({
    data: {
      userId,
      items,
      amount,
      address: { ...address },
      payment,
    },
  });

  // 5. Clear user cart
  await this.usercoreservice.update({
    where: { id: userId },
    data: { cartData: {} },
  });

  return {
    order,
  };
}

}

