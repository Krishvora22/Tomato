import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get('all-food')
  @ApiOperation({summary : 'get all food'})
  async listfood(){
    return await this.foodService.listfood();
  }

  @Post('add')
  @ApiOperation({summary : 'add food'})
  async addfood(
    @Body() dto : CreateFoodDto
  ){
    return await this.foodService.addFood(dto);
  }

  @Delete('delete/:id')
  @ApiOperation({summary :'delete food'})
  async deletefood(
    @Param('id') id: string
  ){
    return await this.foodService.deletefood(id);
  }

}
