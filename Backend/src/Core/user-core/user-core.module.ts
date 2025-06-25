import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/module/prisma/prisma.service';
import { UserCoreService } from './user-core.service';

@Global()
@Module({
  imports: [],
  providers: [UserCoreService, PrismaService],
  exports: [UserCoreService],
})
export class UserCoreModule {}
