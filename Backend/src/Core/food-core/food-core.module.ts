import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/module/prisma/prisma.service';
import { FoodCoreService } from './food-core.service';

@Global()
@Module({
  imports: [],
  providers: [FoodCoreService, PrismaService],
  exports: [FoodCoreService],
})
export class FoodCoreModule {}
