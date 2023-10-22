import { BadRequestException, Injectable } from '@nestjs/common';

import { UserRepository } from '../infra/repositories/user.repository';

import { FindAllResponseDto } from 'src/shared/dtos/find-all-response.dto';
import { CreateUserDto } from '../domain/dtos/create-user.dto';
import { ListUserParamsDto } from '../domain/dtos/list-user-params.dto';
import { UpdateUserDto } from '../domain/dtos/update-user.dto';

import { User } from '@prisma/client';
import UserEntity from '../domain/entities/user.entity';

import * as bcrypt from 'bcrypt';
import { UserCategoryEnum } from '../domain/enums/user-category.enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userExists = await this.userRepository.findOneBy({
      email: createUserDto.email,
      deletedAt: null,
    });

    if (userExists?.id) {
      throw new BadRequestException('Usuário já existe');
    }

    if (
      createUserDto.category === UserCategoryEnum.Teacher &&
      !createUserDto.teacher
    ) {
      throw new BadRequestException(
        'Você precisa enviar os dados do professor',
      );
    }

    return await this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  async findAll(
    params: ListUserParamsDto,
  ): Promise<FindAllResponseDto<Array<UserEntity>>> {
    return await this.userRepository.findAll(params);
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }

  async findOneBy(
    where: Partial<User>,
    removePassword = true,
  ): Promise<UserEntity> {
    return await this.userRepository.findOneBy(where, removePassword);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const userExists = await this.userRepository.findOneBy({
      id,
      deletedAt: null,
    });

    if (!userExists?.id) {
      throw new BadRequestException('Usuário não existe');
    }

    if (updateUserDto.category !== userExists.category) {
      throw new BadRequestException(
        'Você não pode alterar o tipo da sua conta',
      );
    }

    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<UserEntity> {
    const userExists = await this.userRepository.findOneBy({
      id,
      deletedAt: null,
    });

    if (!userExists?.id) {
      throw new BadRequestException('Usuário não existe');
    }

    return await this.userRepository.remove(id);
  }
}
