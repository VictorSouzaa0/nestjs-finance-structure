import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { UserModule } from './user/user.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AccountService } from './account/account.service';
import { BillModule } from './bill/bill.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AccountModule, PrismaModule, UserModule,ConfigModule.forRoot({isGlobal:true}), BillModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, AccountService],
})
export class AppModule {}
