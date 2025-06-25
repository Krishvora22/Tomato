import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserCoreModule } from 'src/Core/user-core/user-core.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserCoreService } from 'src/Core/user-core/user-core.service';
import { PrismaModule } from 'src/shared/module/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: 'a@b0=!cd)',
    }),
    JwtModule,
    PassportModule,
    UserCoreModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy ],
})
export class AuthModule {}
