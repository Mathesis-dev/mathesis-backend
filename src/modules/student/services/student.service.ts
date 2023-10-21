import { BadRequestException, Injectable } from '@nestjs/common';

import { StudentRepository } from '../infra/repositories/student.repository';

import { CreateStudentDto } from '../domain/dtos/create-student.dto';
import { UpdateStudentDto } from '../domain/dtos/update-student.dto';

import { Student } from '@prisma/client';
import StudentEntity from '../domain/entities/student.entity';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async create(createStudentDto: CreateStudentDto): Promise<StudentEntity> {
    const studentExists = await this.studentRepository.findOneBy({
      userId: createStudentDto.userId,
    });

    if (studentExists?.id) {
      throw new BadRequestException('Estudante já cadastrado na plataforma');
    }

    return await this.studentRepository.create(createStudentDto);
  }

  async findOne(id: number): Promise<StudentEntity> {
    return await this.studentRepository.findOne(id);
  }

  async findOneBy(where: Partial<Student>): Promise<StudentEntity> {
    return await this.studentRepository.findOneBy(where);
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<StudentEntity> {
    const studentExists = await this.studentRepository.findOneBy({
      id,
    });

    if (!studentExists) {
      throw new BadRequestException('Estudante não existe');
    }

    return await this.studentRepository.update(id, updateStudentDto);
  }

  async remove(id: number): Promise<StudentEntity> {
    const studentExists = await this.studentRepository.findOneBy({
      id,
    });

    if (!studentExists) {
      throw new BadRequestException('Estudante não existe');
    }

    return await this.studentRepository.remove(id);
  }
}
