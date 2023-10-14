import { Injectable } from '@nestjs/common';

import { Teacher } from '@prisma/client';
import TeacherEntity from '../../domain/entities/teacher.entity';

import { PrismaService } from 'src/database/prisma/prisma.service';

import { FindAllResponseDto } from 'src/shared/dtos/find-all-response.dto';
import { CreateTeacherDto } from '../../domain/dtos/create-teacher.dto';
import { ListTeacherParamsDto } from '../../domain/dtos/list-teacher-params.dto';
import { UpdateTeacherDto } from '../../domain/dtos/update-teacher.dto';

@Injectable()
export class TeacherRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<TeacherEntity> {
    const teacher = await this.prismaService.teacher.create({
      data: {
        ...createTeacherDto,
        schedules: {
          createMany: {
            data: createTeacherDto.schedules,
          },
        },
      },
      include: {
        user: true,
        schedules: true,
      },
    });

    return TeacherEntity.fromPrisma(teacher, teacher.user, teacher.schedules);
  }

  async findAll(
    params: ListTeacherParamsDto,
  ): Promise<FindAllResponseDto<Array<TeacherEntity>>> {
    const skip = params.skip ? +params.skip : undefined;
    const take = params.take ? +params.take : undefined;
    const orderBy = params.orderBy ?? 'id';
    const ordering = params.ordering ?? 'desc';

    const [total, prismaTeachers] = await this.prismaService.$transaction([
      this.prismaService.teacher.count({
        where: {
          state: params.state,
          city: params.city,
          deletedAt: null,
          user: {
            name: { contains: params.search, mode: 'insensitive' },
          },
          schedules: {
            some: {
              subject: params.subject,
            },
          },
        },
      }),
      this.prismaService.teacher.findMany({
        skip: skip,
        take: take,
        where: {
          state: params.state,
          city: params.city,
          deletedAt: null,
          user: {
            name: { contains: params.search, mode: 'insensitive' },
          },
          schedules: {
            some: {
              subject: params.subject,
            },
          },
        },
        include: {
          user: true,
          schedules: true,
        },
        orderBy: {
          [orderBy]: ordering,
        },
      }),
    ]);

    const teachers = prismaTeachers.map((teacher) =>
      TeacherEntity.fromPrisma(teacher, teacher.user, teacher.schedules),
    );

    return {
      data: teachers,
      total: total,
      pages: take ? Math.round(total / take) : 0,
    };
  }

  async findOne(id: number): Promise<TeacherEntity> {
    const teacher = await this.prismaService.teacher.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        schedules: true,
      },
    });

    return TeacherEntity.fromPrisma(teacher, teacher.user, teacher.schedules);
  }

  async findOneBy(where: Partial<Teacher>): Promise<TeacherEntity> {
    const teacher = await this.prismaService.teacher.findUnique({
      where,
      include: { user: true, schedules: true },
    });

    return TeacherEntity.fromPrisma(teacher, teacher.user, teacher.schedules);
  }

  async update(
    id: number,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<TeacherEntity> {
    const teacher = await this.prismaService.teacher.update({
      where: {
        id,
      },
      data: {
        ...updateTeacherDto,
        schedules: {
          updateMany: {
            data: updateTeacherDto.schedules,
            where: {
              id: {
                in: updateTeacherDto.schedules.map((schedule) => schedule.id),
              },
            },
          },
        },
      },
      include: {
        user: true,
        schedules: true,
      },
    });

    return TeacherEntity.fromPrisma(teacher, teacher.user, teacher.schedules);
  }

  async remove(id: number): Promise<TeacherEntity> {
    const teacher = await this.prismaService.teacher.delete({
      where: {
        id,
      },
      include: {
        user: true,
        schedules: true,
      },
    });

    return TeacherEntity.fromPrisma(teacher, teacher.user, teacher.schedules);
  }
}
