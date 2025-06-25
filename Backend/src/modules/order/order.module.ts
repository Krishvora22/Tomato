import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserCoreModule } from 'src/Core/user-core/user-core.module';
import { FoodCoreModule } from 'src/Core/food-core/food-core.module';
import { OrderCoreModule } from 'src/Core/order-core/order-core.module';

@Module({
  imports :[UserCoreModule , FoodCoreModule , OrderCoreModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
