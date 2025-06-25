import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('placeorder')
  @ApiOperation({summary :'place order'})
  async placeOrder(
    @Body() data : CreateOrderDto
  ){
    return await this.orderService.placeOrder(data);
  }

}
