import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UserCoreService } from 'src/Core/user-core/user-core.service';
import { foodMessages, userMessages } from 'src/shared/keys/user.key';
import { FoodCoreService } from 'src/Core/food-core/food-core.service';
import { use } from 'passport';

@Injectable()
export class CartService {

  constructor(
    private readonly usercoreservice: UserCoreService,
    private readonly foodcoreservice: FoodCoreService
  ) { }

  async addToCart(userId: string, foodId: string) {
    // 1. Check user
    const user = await this.usercoreservice.findFirst({
      where: {
        id: userId,
        isDeleted: false,
      },
    });

    if (!user) {
      throw new NotFoundException(userMessages.USER_NOT_FOUND);
    }

    // 2. Check food
    const food = await this.foodcoreservice.findFirst({
      where: {
        id: foodId,
        isDeleted: false,
      },
    });

    if (!food) {
      throw new NotFoundException(foodMessages.FOOD_NOT_FOUND);
    }

    // 3. Prepare new cart data
    const cartData = (user.cartData || {}) as Record<string, number>;
    cartData[foodId] = (cartData[foodId] || 0) + 1;

    // 4. Update cartData in user
    await this.usercoreservice.update({
      where: { 
          id: userId
      },
      data: { 
        cartData 
      },
    });

    return {
      success: true,
      message: 'Added to cart',
      cartData,
    };
  }

  async removeFromCart(userId: string, foodId: string) {
    const user = await this.usercoreservice.findUnique({
      where: {
        id: userId,
        isDeleted: false,
      },
    });

    if (!user) {
      throw new NotFoundException(userMessages.USER_NOT_FOUND);
    }

    const cartData = (user.cartData || {}) as Record<string, number>;

    if (cartData[foodId] && cartData[foodId] > 0) {
      cartData[foodId] -= 1;

      if (cartData[foodId] === 0) {
        delete cartData[foodId];
      }

      // Update user cart
      await this.usercoreservice.update({
        where: { id: userId },
        data: { cartData },
      });
    }

    return {
      success: true,
      message: 'Removed from cart',
      cartData,
    };
  }

  async getcart(userId: string) {
    console.log(userId);
    const user = await this.usercoreservice.findUnique({
      where: {
        id: userId,
      }
    })

    if (!user) {
      return {
        message: userMessages.USER_NOT_FOUND
      }
    }

    const cartData = user.cartData;

    if (!cartData || Object.keys(cartData).length === 0) {
      return {
        cartData: null,
      };
    }

    return {
      cartData,
    };

  }



}
