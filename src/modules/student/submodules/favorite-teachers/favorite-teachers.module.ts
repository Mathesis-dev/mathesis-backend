import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';

import { FavoriteTeachersController } from './infra/controllers/favorite-teachers.controller';
import { FavoriteTeachersRepository } from './infra/repositories/favorite-teachers.repository';
import { FavoriteTeachersService } from './services/favorite-teachers.service';

@Module({
  imports: [PrismaModule],
  controllers: [FavoriteTeachersController],
  providers: [FavoriteTeachersService, FavoriteTeachersRepository],
  exports: [FavoriteTeachersService, FavoriteTeachersRepository],
})
export class FavoriteTeachersModule {}
