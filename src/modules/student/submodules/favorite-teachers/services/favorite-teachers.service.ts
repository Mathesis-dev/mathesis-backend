import { Injectable } from '@nestjs/common';

import { FindAllResponseDto } from 'src/shared/dtos/find-all-response.dto';
import { FavoriteTeacherDto } from '../domain/dtos/favorite-teacher.dto';
import { ListFavoriteTeachersParamsDto } from '../domain/dtos/list-favorite-teachers-params.dto';

import FavoriteTeachersEntity from '../domain/entities/favorite-teachers.entity';

import { FavoriteTeachersRepository } from '../infra/repositories/favorite-teachers.repository';

@Injectable()
export class FavoriteTeachersService {
  constructor(
    private readonly favoriteTeachersRepository: FavoriteTeachersRepository,
  ) {}

  async findAll(
    params: ListFavoriteTeachersParamsDto,
  ): Promise<FindAllResponseDto<Array<FavoriteTeachersEntity>>> {
    return await this.favoriteTeachersRepository.findAll(params);
  }

  async isFavorite(studentId: number, teacherId: number): Promise<boolean> {
    return await this.favoriteTeachersRepository.isFavorite(
      studentId,
      teacherId,
    );
  }

  async create(
    favoriteTeacherDto: FavoriteTeacherDto,
  ): Promise<FavoriteTeachersEntity> {
    return await this.favoriteTeachersRepository.create(favoriteTeacherDto);
  }

  async remove(
    studentId: number,
    teacherId: number,
  ): Promise<FavoriteTeachersEntity> {
    return await this.favoriteTeachersRepository.remove(studentId, teacherId);
  }
}
