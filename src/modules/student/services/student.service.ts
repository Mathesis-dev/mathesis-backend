import { BadRequestException, Injectable } from '@nestjs/common';

import { StudentRepository } from '../infra/repositories/student.repository';

import { FindAllResponseDto } from 'src/shared/dtos/find-all-response.dto';
import { CreateStudentDto } from '../domain/dtos/create-student.dto';
import { ListStudentParamsDto } from '../domain/dtos/list-student-params.dto';
import { UpdateStudentDto } from '../domain/dtos/update-student.dto';

import { Student } from '@prisma/client';
import StudentEntity from '../domain/entities/student.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async create(createStudentDto: CreateStudentDto): Promise<StudentEntity> {
    const studentExists = await this.studentRepository.findOneBy({
      email: createStudentDto.email,
    });

    if (studentExists?.id) {
      throw new BadRequestException('Estudante já existe');
    }

    return await this.studentRepository.create({
      ...createStudentDto,
      password: await bcrypt.hash(createStudentDto.password, 10),
    });
  }

  async findAll(
    params: ListStudentParamsDto,
  ): Promise<FindAllResponseDto<Array<StudentEntity>>> {
    return await this.studentRepository.findAll(params);
  }

  async findOne(id: number): Promise<StudentEntity> {
    return await this.studentRepository.findOne(id);
  }

  async findOneBy(
    where: Partial<Student>,
    removePassword = true,
  ): Promise<StudentEntity> {
    return await this.studentRepository.findOneBy(where, removePassword);
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
