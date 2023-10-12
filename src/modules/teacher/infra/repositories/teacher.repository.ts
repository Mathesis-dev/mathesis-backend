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
      data: createTeacherDto,
      include: {
        user: true,
      },
    });

    return TeacherEntity.fromPrisma(teacher, teacher.user);
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
          user: {
            name: { contains: params.search, mode: 'insensitive' },
          },
        },
      }),
      this.prismaService.teacher.findMany({
        skip: skip,
        take: take,
        where: {
          user: {
            name: { contains: params.search, mode: 'insensitive' },
          },
        },
        include: {
          user: true,
        },
        orderBy: {
          [orderBy]: ordering,
        },
      }),
    ]);

    const teachers = prismaTeachers.map((teacher) =>
      TeacherEntity.fromPrisma(teacher, teacher.user),
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
      },
    });

    return TeacherEntity.fromPrisma(teacher, teacher.user);
  }

  async findOneBy(where: Partial<Teacher>): Promise<TeacherEntity> {
    const teacher = await this.prismaService.teacher.findUnique({
      where,
      include: { user: true },
    });

    return TeacherEntity.fromPrisma(teacher, teacher.user);
  }

  async update(
    id: number,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<TeacherEntity> {
    const teacher = await this.prismaService.teacher.update({
      where: {
        id,
      },
      data: updateTeacherDto,
      include: {
        user: true,
      },
    });

    return TeacherEntity.fromPrisma(teacher, teacher.user);
  }

  async remove(id: number): Promise<TeacherEntity> {
    const teacher = await this.prismaService.teacher.delete({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    return TeacherEntity.fromPrisma(teacher, teacher.user);
  }
}
