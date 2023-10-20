import { Injectable } from '@nestjs/common';

import { Student } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import StudentEntity from '../../domain/entities/student.entity';

import { FindAllResponseDto } from 'src/shared/dtos/find-all-response.dto';
import { CreateStudentDto } from '../../domain/dtos/create-student.dto';
import { ListStudentParamsDto } from '../../domain/dtos/list-student-params.dto';
import { UpdateStudentDto } from '../../domain/dtos/update-student.dto';

@Injectable()
export class StudentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createStudentDto: CreateStudentDto): Promise<StudentEntity> {
    const student = await this.prismaService.student.create({
      data: createStudentDto,
    });

    return StudentEntity.fromPrisma({ ...student, password: undefined });
  }

  async findAll(
    params: ListStudentParamsDto,
  ): Promise<FindAllResponseDto<Array<StudentEntity>>> {
    const skip = params.skip ? +params.skip : undefined;
    const take = params.take ? +params.take : undefined;
    const orderBy = params.orderBy ?? 'id';
    const ordering = params.ordering ?? 'desc';

    const [total, prismaStudents] = await this.prismaService.$transaction([
      this.prismaService.student.count({
        where: {
          name: { contains: params.search, mode: 'insensitive' },
        },
      }),
      this.prismaService.student.findMany({
        skip: skip,
        take: take,
        where: {
          name: { contains: params.search, mode: 'insensitive' },
        },
        orderBy: {
          [orderBy]: ordering,
        },
      }),
    ]);

    const students = prismaStudents.map((student) =>
      StudentEntity.fromPrisma({ ...student, password: undefined }),
    );

    return {
      data: students,
      total: total,
      pages: take ? Math.round(total / take) : 0,
    };
  }

  async findOne(id: number): Promise<StudentEntity> {
    const student = await this.prismaService.student.findUnique({
      where: {
        id,
      },
    });

    return StudentEntity.fromPrisma({ ...student, password: undefined });
  }

  async findOneBy(
    where: Partial<Student>,
    removePassword = true,
  ): Promise<StudentEntity> {
    const student = await this.prismaService.student.findUnique({ where });

    return StudentEntity.fromPrisma({
      ...student,
      password: removePassword ? undefined : student.password,
    });
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<StudentEntity> {
    const student = await this.prismaService.student.update({
      where: {
        id,
      },
      data: updateStudentDto,
    });

    return StudentEntity.fromPrisma({ ...student, password: undefined });
  }

  async remove(id: number): Promise<StudentEntity> {
    const student = await this.prismaService.student.delete({
      where: {
        id,
      },
    });

    return StudentEntity.fromPrisma({ ...student, password: undefined });
  }
}
