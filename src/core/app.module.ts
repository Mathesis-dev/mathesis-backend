import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { JwtAuthGuard } from 'src/modules/auth/domain/guards/jwt-auth.guard';
import { UserModule } from 'src/modules/user/user.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [PrismaModule, ConfigModule, UserModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
