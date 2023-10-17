import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { ScheduleRepository } from './infra/repositories/schedule.repository';
import { ScheduleService } from './services/schedule.service';
import { ScheduleController } from './infra/controllers/schedule.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleRepository],
  exports: [ScheduleService, ScheduleRepository],
})
export class SchedulesModule {}
