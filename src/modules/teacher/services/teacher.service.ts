import { BadRequestException, Injectable } from '@nestjs/common';

import { FindAllResponseDto } from 'src/shared/dtos/find-all-response.dto';

import { Teacher } from '@prisma/client';
import { CreateTeacherDto } from '../domain/dtos/create-teacher.dto';
import { ListTeacherParamsDto } from '../domain/dtos/list-teacher-params.dto';
import { UpdateTeacherDto } from '../domain/dtos/update-teacher.dto';
import TeacherEntity from '../domain/entities/teacher.entity';
import { TeacherRepository } from '../infra/repositories/teacher.repository';

@Injectable()
export class TeacherService {
  constructor(private readonly teacherRepository: TeacherRepository) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<TeacherEntity> {
    const teacherExists = await this.teacherRepository.findOneBy({
      userId: createTeacherDto.userId,
      deletedAt: null,
    });

    if (teacherExists?.id) {
      throw new BadRequestException('Professor já é cadastrado na plataforma');
    }

    return await this.teacherRepository.create(createTeacherDto);
  }

  async findAll(
    params: ListTeacherParamsDto,
  ): Promise<FindAllResponseDto<Array<TeacherEntity>>> {
    return await this.teacherRepository.findAll(params);
  }

  async findOne(id: number): Promise<TeacherEntity> {
    return await this.teacherRepository.findOne(id);
  }

  async findOneBy(where: Partial<Teacher>): Promise<TeacherEntity> {
    return await this.teacherRepository.findOneBy(where);
  }

  async update(
    id: number,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<TeacherEntity> {
    const teacherExists = await this.teacherRepository.findOneBy({
      id,
      deletedAt: null,
    });

    if (!teacherExists?.id) {
      throw new BadRequestException('Esse professor não existe');
    }

    return await this.teacherRepository.update(id, updateTeacherDto);
  }

  async remove(id: number): Promise<TeacherEntity> {
    const teacherExists = await this.teacherRepository.findOneBy({
      id,
      deletedAt: null,
    });

    if (!teacherExists?.id) {
      throw new BadRequestException('Esse professor não existe');
    }

    return await this.teacherRepository.remove(id);
  }
}
