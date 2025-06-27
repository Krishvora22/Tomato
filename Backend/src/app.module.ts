import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './shared/module/prisma/prisma.module';
import { FoodModule } from './modules/food/food.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { MailService } from '@sendgrid/mail';

@Module({
  imports: [AuthModule , PrismaModule , FoodModule , CartModule , OrderModule ],
  controllers: [AppController],
  providers: [AppService, MailService ],
})
export class AppModule {}
