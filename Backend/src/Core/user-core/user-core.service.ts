import { Injectable } from '@nestjs/common';
import { PrismaBaseRepository } from 'src/shared/libs/prisma-base.repository';
import { PrismaService } from 'src/shared/module/prisma/prisma.service';
import { userMessages } from 'src/shared/keys/user.key';
import { Prisma , User} from '@prisma/client';
import { UserCorePaginateDto } from './dto/user-core.dto';

@Injectable()
export class UserCoreService extends PrismaBaseRepository<
  User,
  UserCorePaginateDto,
  Prisma.UserCreateArgs,
  Prisma.UserUpdateArgs,
  Prisma.UserUpdateManyArgs,
  Prisma.UserFindUniqueArgs,
  Prisma.UserFindFirstArgs,
  Prisma.UserFindManyArgs,
  Prisma.UserDeleteArgs,
  Prisma.UserDeleteManyArgs,
  Prisma.UserCountArgs
> {
  constructor(public prisma: PrismaService) {
    super(prisma.prisma.user, {
      NOT_FOUND: userMessages.USER_NOT_FOUND,
      DELETED: userMessages.USER_DELETED,
    });
  }
}
