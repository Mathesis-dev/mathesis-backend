import { Module } from '@nestjs/common';
import { StudentService } from './services/student.service';
import { StudentController } from './infra/controllers/student.controller';
import { StudentRepository } from './infra/repositories/student.repository';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { UserRepository } from '../user/infra/repositories/user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [StudentController],
  providers: [StudentService, StudentRepository, UserRepository],
  exports: [StudentService, StudentRepository],
})
export class StudentModule {}
