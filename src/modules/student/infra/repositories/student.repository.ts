import { Injectable } from '@nestjs/common';

import { Student } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import StudentEntity from '../../domain/entities/student.entity';

import { CreateStudentDto } from '../../domain/dtos/create-student.dto';
import { UpdateStudentDto } from '../../domain/dtos/update-student.dto';

@Injectable()
export class StudentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createStudentDto: CreateStudentDto): Promise<StudentEntity> {
    const student = await this.prismaService.student.create({
      data: {
        ...createStudentDto,
        favoriteTeachers: {
          connect: createStudentDto.favoriteTeachers,
        },
      },
      include: {
        user: true,
        favoriteTeachers: true,
      },
    });

    return StudentEntity.fromPrisma(student);
  }

  async findOne(id: number): Promise<StudentEntity> {
    const student = await this.prismaService.student.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        favoriteTeachers: true,
      },
    });

    return StudentEntity.fromPrisma(student);
  }

  async findOneBy(where: Partial<Student>): Promise<StudentEntity> {
    const student = await this.prismaService.student.findUnique({
      where,
      include: {
        user: true,
        favoriteTeachers: true,
      },
    });

    return StudentEntity.fromPrisma(student);
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<StudentEntity> {
    const student = await this.prismaService.student.update({
      where: {
        id,
      },
      data: {
        ...updateStudentDto,
        favoriteTeachers: {
          connect: updateStudentDto.favoriteTeachers,
        },
      },
      include: {
        user: true,
        favoriteTeachers: true,
      },
    });

    return StudentEntity.fromPrisma(student);
  }

  async remove(id: number): Promise<StudentEntity> {
    const student = await this.prismaService.student.delete({
      where: {
        id,
      },
      include: {
        user: true,
        favoriteTeachers: true,
      },
    });

    return StudentEntity.fromPrisma(student);
  }
}
