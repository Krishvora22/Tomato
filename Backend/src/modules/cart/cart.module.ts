import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { UserCoreModule } from 'src/Core/user-core/user-core.module';
import { FoodCoreModule } from 'src/Core/food-core/food-core.module';

@Module({
  imports :[UserCoreModule , FoodCoreModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
