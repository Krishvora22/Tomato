import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

 @Post('add')
  async addToCart( @Body() dto: CreateCartDto
  ) {
            const { userId, foodId } = dto;
    return this.cartService.addToCart(userId , foodId);
  }

   @Post('remove')
  async removeFromCart( @Body() dto: CreateCartDto
  ) {
    const { userId, foodId } = dto;
    return this.cartService.removeFromCart(userId , foodId);
  }


  @Get('get')
async getcart(@Query('userId') userId: string) {
  return this.cartService.getcart(userId);
}


}
