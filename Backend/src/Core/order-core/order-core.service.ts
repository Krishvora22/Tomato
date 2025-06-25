import { Injectable } from '@nestjs/common';
import { PrismaBaseRepository } from 'src/shared/libs/prisma-base.repository';
import { PrismaService } from 'src/shared/module/prisma/prisma.service';
import { Order, Prisma } from '@prisma/client';
import { OrderCorePaginateDto } from './dto/order-core.dto';
import { orderMessages } from 'src/shared/keys/user.key';

@Injectable()
export class OrderCoreService extends PrismaBaseRepository<
  Order,
  OrderCorePaginateDto,
  Prisma.OrderCreateArgs,
  Prisma.OrderUpdateArgs,
  Prisma.OrderUpdateManyArgs,
  Prisma.OrderFindUniqueArgs,
  Prisma.OrderFindFirstArgs,
  Prisma.OrderFindManyArgs,
  Prisma.OrderDeleteArgs,
  Prisma.OrderDeleteManyArgs,
  Prisma.OrderCountArgs
> {
  constructor(public prisma: PrismaService) {
    super(prisma.prisma.order, {
      NOT_FOUND: orderMessages.ORDER_NOT_FOUND,
      DELETED: orderMessages.ORDER_FAILED,
    });
  }
}
