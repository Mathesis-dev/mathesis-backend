import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './infra/controllers/user.controller';
import { UserRepository } from './infra/repositories/user.repository';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
