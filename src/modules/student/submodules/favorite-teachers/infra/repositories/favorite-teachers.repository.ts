import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';

import FavoriteTeachersEntity from '../../domain/entities/favorite-teachers.entity';

import { FindAllResponseDto } from 'src/shared/dtos/find-all-response.dto';
import { FavoriteTeacherDto } from '../../domain/dtos/favorite-teacher.dto';
import { ListFavoriteTeachersParamsDto } from '../../domain/dtos/list-favorite-teachers-params.dto';
import { FavoriteTeachers } from '@prisma/client';

@Injectable()
export class FavoriteTeachersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(
    params: ListFavoriteTeachersParamsDto,
  ): Promise<FindAllResponseDto<Array<FavoriteTeachersEntity>>> {
    const skip = params.skip ? +params.skip : undefined;
    const take = params.take ? +params.take : undefined;
    const orderBy = params.orderBy ?? 'id';
    const ordering = params.ordering ?? 'desc';

    const [total, prismaFavoriteTeachers] =
      await this.prismaService.$transaction([
        this.prismaService.favoriteTeachers.count({
          where: {
            studentId: params.studentId,
            teacher: {
              state: params.state,
              city: params.city,
              deletedAt: null,
              user: {
                name: { contains: params.search, mode: 'insensitive' },
              },
            },
          },
        }),
        this.prismaService.favoriteTeachers.findMany({
          skip: skip,
          take: take,
          where: {
            studentId: params.studentId,
            teacher: {
              state: params.state,
              city: params.city,
              deletedAt: null,
              user: {
                name: { contains: params.search, mode: 'insensitive' },
              },
            },
          },
          include: {
            student: true,
            teacher: true,
          },
          orderBy: {
            [orderBy]: ordering,
          },
        }),
      ]);

    const favoriteTeachers = prismaFavoriteTeachers.map((favoriteTeacher) =>
      FavoriteTeachersEntity.fromPrisma(favoriteTeacher),
    );

    return {
      data: favoriteTeachers,
      total: total,
      pages: take ? Math.round(total / take) : 0,
    };
  }

  async isFavorite(studentId: number, teacherId: number): Promise<boolean> {
    const favoriteTeacher = await this.prismaService.favoriteTeachers.findFirst(
      {
        where: {
          studentId,
          teacherId,
        },
      },
    );

    return !!favoriteTeacher;
  }

  async create(
    favoriteTeacherDto: FavoriteTeacherDto,
  ): Promise<FavoriteTeachersEntity> {
    const favoriteTeacher = await this.prismaService.favoriteTeachers.create({
      data: favoriteTeacherDto,
      include: {
        student: true,
        teacher: true,
      },
    });

    return FavoriteTeachersEntity.fromPrisma(favoriteTeacher);
  }

  async findOneBy(
    where: Partial<FavoriteTeachers>,
  ): Promise<FavoriteTeachersEntity> {
    const favoriteTeacher =
      await this.prismaService.favoriteTeachers.findUnique({
        where,
        include: {
          student: true,
          teacher: true,
        },
      });

    return FavoriteTeachersEntity.fromPrisma(favoriteTeacher);
  }

  async remove(
    studentId: number,
    teacherId: number,
  ): Promise<FavoriteTeachersEntity> {
    const { id } = await this.findOneBy({ studentId, teacherId });

    const favoriteTeacher = await this.prismaService.favoriteTeachers.delete({
      where: {
        id,
      },
      include: {
        student: true,
        teacher: true,
      },
    });

    return FavoriteTeachersEntity.fromPrisma(favoriteTeacher);
  }
}
