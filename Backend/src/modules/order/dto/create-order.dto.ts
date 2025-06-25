import { IsString, IsNotEmpty, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class AddressDto {
  @ApiProperty({ example: '123 MG Road' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'Ahmedabad' })
  @IsString()
  city: string;

  @ApiProperty({ example: '380001' })
  @IsString()
  postalCode: string;

  @ApiProperty({ example: 'India' })
  @IsString()
  country: string;
}

export class CreateOrderDto {
  @ApiProperty({ example: '43a81845-2a9d-40f9-9cc6-9df19fd5db96' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: {
      address: '123 MG Road',
      city: 'Ahmedabad',
      postalCode: '380001',
      country: 'India',
    },
  })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiProperty({ example: false })
  @IsBoolean()
  payment: boolean;
}
