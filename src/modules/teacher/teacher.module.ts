import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { TeacherController } from './infra/controllers/teacher.controller';
import { TeacherRepository } from './infra/repositories/teacher.repository';
import { TeacherService } from './services/teacher.service';

@Module({
  imports: [PrismaModule],
  controllers: [TeacherController],
  providers: [TeacherService, TeacherRepository],
  exports: [TeacherService, TeacherRepository],
})
export class TeacherModule {}
