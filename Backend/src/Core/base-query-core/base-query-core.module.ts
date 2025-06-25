import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/module/prisma/prisma.service';

import { BaseQueryCoreService } from './base-query-core.service';

@Module({
  providers: [PrismaService, BaseQueryCoreService],
  exports: [BaseQueryCoreService],
})
export class BaseQueryCoreModule {}
