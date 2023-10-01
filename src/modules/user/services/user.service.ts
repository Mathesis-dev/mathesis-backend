import { Injectable } from '@nestjs/common';

import { UserRepository } from '../infra/repositories/user.repository';

import UserEntity from '../domain/entities/user.entity';
import { CreateUserDto } from '../domain/dtos/create-user.dto';
import { UpdateUserDto } from '../domain/dtos/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userExists = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (userExists) {
      throw new Error('Usuário já existe');
    }

    return await this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<Array<UserEntity>> {
    return await this.userRepository.findAll();
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }

  async findOneBy(where: Partial<User>): Promise<UserEntity> {
    return await this.userRepository.findOneBy(where);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const userExists = await this.userRepository.findOneBy({
      id,
    });

    if (!userExists) {
      throw new Error('Usuário não existe');
    }

    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<UserEntity> {
    const userExists = await this.userRepository.findOneBy({
      id,
    });

    if (!userExists) {
      throw new Error('Usuário não existe');
    }

    return await this.userRepository.remove(id);
  }
}
