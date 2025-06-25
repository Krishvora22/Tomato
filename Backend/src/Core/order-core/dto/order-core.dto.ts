import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@prisma/client';
import { IsArray } from 'class-validator';
// import { CorePaginateDto } from 'src/core/base-query-core/dto/base-query-core.dto';
import { CorePaginateDto } from 'src/Core/base-query-core/dto/base-query-core.dto';

export class OrderCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: Order[];
}
