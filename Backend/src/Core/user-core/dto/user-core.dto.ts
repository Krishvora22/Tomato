import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/Core/base-query-core/dto/base-query-core.dto';


export class UserCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: User[];
}
