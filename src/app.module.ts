import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { UserModule } from './user/user.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AccountModule, PrismaModule, UserModule,ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
