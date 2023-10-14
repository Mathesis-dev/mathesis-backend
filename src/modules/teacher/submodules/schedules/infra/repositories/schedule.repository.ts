import { Injectable } from '@nestjs/common';

import { TeachingSchedules } from '@prisma/client';
import ScheduleEntity from '../../domain/entities/schedule.entity';

import { PrismaService } from 'src/database/prisma/prisma.service';

import { FindAllResponseDto } from 'src/shared/dtos/find-all-response.dto';
import { CreateScheduleDto } from '../../domain/dtos/create-schedule.dto';
import { ListScheduleParamsDto } from '../../domain/dtos/list-schedule-params.dto';
import { UpdateScheduleDto } from '../../domain/dtos/update-schedule.dto';

@Injectable()
export class ScheduleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<ScheduleEntity> {
    const schedule = await this.prismaService.teachingSchedules.create({
      data: createScheduleDto,
      include: {
        teacher: true,
      },
    });

    return ScheduleEntity.fromPrisma(schedule, schedule.teacher);
  }

  async findAllByTeacherId(
    params: ListScheduleParamsDto,
    id: number,
  ): Promise<FindAllResponseDto<Array<ScheduleEntity>>> {
    const skip = params.skip ? +params.skip : undefined;
    const take = params.take ? +params.take : undefined;
    const orderBy = params.orderBy ?? 'id';
    const ordering = params.ordering ?? 'desc';

    const [total, prismaSchedules] = await this.prismaService.$transaction([
      this.prismaService.teachingSchedules.count({
        where: {
          deletedAt: null,
          teacherId: id,
          subject: params.subject,
        },
      }),
      this.prismaService.teachingSchedules.findMany({
        skip: skip,
        take: take,
        where: {
          deletedAt: null,
          teacherId: id,
          subject: params.subject,
        },
        include: {
          teacher: true,
        },
        orderBy: {
          [orderBy]: ordering,
        },
      }),
    ]);

    const schedules = prismaSchedules.map((schedule) =>
      ScheduleEntity.fromPrisma(schedule, schedule.teacher),
    );

    return {
      data: schedules,
      total: total,
      pages: take ? Math.round(total / take) : 0,
    };
  }

  async findOne(id: number): Promise<ScheduleEntity> {
    const schedule = await this.prismaService.teachingSchedules.findUnique({
      where: {
        id,
      },
      include: {
        teacher: true,
      },
    });

    return ScheduleEntity.fromPrisma(schedule, schedule.teacher);
  }

  async findOneBy(where: Partial<TeachingSchedules>): Promise<ScheduleEntity> {
    const schedule = await this.prismaService.teachingSchedules.findUnique({
      where,
      include: { teacher: true },
    });

    return ScheduleEntity.fromPrisma(schedule, schedule.teacher);
  }

  async update(
    id: number,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<ScheduleEntity> {
    const schedule = await this.prismaService.teachingSchedules.update({
      where: {
        id,
      },
      data: updateScheduleDto,
      include: {
        teacher: true,
      },
    });

    return ScheduleEntity.fromPrisma(schedule, schedule.teacher);
  }

  async remove(id: number): Promise<ScheduleEntity> {
    const schedule = await this.prismaService.teachingSchedules.delete({
      where: {
        id,
      },
      include: {
        teacher: true,
      },
    });

    return ScheduleEntity.fromPrisma(schedule, schedule.teacher);
  }
}
