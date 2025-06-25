import { Injectable } from '@nestjs/common';
import { PrismaBaseRepository } from 'src/shared/libs/prisma-base.repository';
import { PrismaService } from 'src/shared/module/prisma/prisma.service';
import { FoodCorePaginateDto } from './dto/food-core.dto';
import { foodMessages } from 'src/shared/keys/user.key';
import { Food, Prisma } from '@prisma/client';

@Injectable()
export class FoodCoreService extends PrismaBaseRepository<
  Food,
  FoodCorePaginateDto,
  Prisma.FoodCreateArgs,
  Prisma.FoodUpdateArgs,
  Prisma.FoodUpdateManyArgs,
  Prisma.FoodFindUniqueArgs,
  Prisma.FoodFindFirstArgs,
  Prisma.FoodFindManyArgs,
  Prisma.FoodDeleteArgs,
  Prisma.FoodDeleteManyArgs,
  Prisma.FoodCountArgs
> {
  constructor(public prisma: PrismaService) {
    super(prisma.prisma.food, {
      NOT_FOUND: foodMessages.FOOD_NOT_FOUND,
      DELETED: foodMessages.FOOD_DELETED,
    });
  }
}
