import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/module/prisma/prisma.service';
import { OrderCoreService } from './order-core.service';

@Global()
@Module({
  imports: [],
  providers: [OrderCoreService, PrismaService],
  exports: [OrderCoreService],
})
export class OrderCoreModule {}
