import { IsString, IsArray, IsNumber, IsObject, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCartDto {
@ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  foodId: string;


}
