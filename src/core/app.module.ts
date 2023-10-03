import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [ConfigModule, UserModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
