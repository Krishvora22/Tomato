import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { FoodCoreService } from 'src/Core/food-core/food-core.service';
import { foodMessages } from 'src/shared/keys/user.key';

@Injectable()
export class FoodService {
  constructor(
    private foodcoreserice: FoodCoreService
  ) { }


  async addFood(data: CreateFoodDto) {
    const { name, description, price, image, category } = data;

    try {
      const newFood = await this.foodcoreserice.create({
        data: {
          name,
          description,
          price,
          image,
          category,
          isDeleted: false,
        },
      });

      return {
        data: newFood,
      };
    } catch (error) {
      return {
        message: foodMessages.FOOD_NOT_FOUND || 'Failed to create food item',
        error: error.message,
      };
    }
  }

  async listfood() {
    return await this.foodcoreserice.findMany({
      where: {
        isDeleted: false
      }
    });
  }

  async deletefood(id: string) {
    const food = await this.foodcoreserice.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!food) {
      return {
        message: foodMessages.FOOD_NOT_FOUND,
      };
    }

    await this.foodcoreserice.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    return {
      message: foodMessages.FOOD_DELETED,
    };
  }


}
