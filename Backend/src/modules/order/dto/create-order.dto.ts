import { IsString, IsNotEmpty, IsBoolean, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class AddressDto {
  @ApiProperty({ example: 'First' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Last' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: '123 MG Road' })
  @IsString()
  street: string;

  @ApiProperty({ example: 'Ahmedabad' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'Gujarat' })
  @IsString()
  state: string;

  @ApiProperty({ example: 380001 })
  @Type(() => Number)
  @IsNumber()
  zipCode: number;

  @ApiProperty({ example: 'India' })
  @IsString()
  country: string;

  @ApiProperty({ example: 9876543210 })
  @Type(() => Number)
  @IsNumber()
  phone: number;
}


export class CreateOrderDto {
  @ApiProperty({ example: '43a81845-2a9d-40f9-9cc6-9df19fd5db96' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: {
        firstName: "First",
    lastName: "Last",
    email: "user@example.com",
    street: "123 MG Road",
    city: "Ahmedabad",
    state: "Gujarat",
    zipCode: 380001,
    country: "India",
    phone: 9876543210
    },
  })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiProperty({ example: false })
  @IsBoolean()
  payment: boolean;
}
