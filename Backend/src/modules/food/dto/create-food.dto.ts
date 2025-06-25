import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFoodDto {
  @ApiProperty({ example: 'Veg Biryani', description: 'Name of the food item' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Spicy and flavorful rice dish', description: 'Short description of the food item' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 199.99, description: 'Price of the food item' })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg', description: 'URL of the food image' })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ example: 'Main Course', description: 'Category the food item belongs to' })
  @IsString()
  @IsNotEmpty()
  category: string;

  
}
