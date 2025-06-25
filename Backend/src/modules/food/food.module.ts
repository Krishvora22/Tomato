import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { FoodCoreModule } from 'src/Core/food-core/food-core.module';

@Module({
  imports :[FoodCoreModule],
  controllers: [FoodController ],
  providers: [FoodService],
})
export class FoodModule {}
