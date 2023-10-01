import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';
import { User } from '@prisma/client';

import UserEntity from '../../domain/entities/user.entity';
import { CreateUserDto } from '../../domain/dtos/create-user.dto';
import { UpdateUserDto } from '../../domain/dtos/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.prismaService.user.create({ data: createUserDto });

    return UserEntity.fromPrisma(user);
  }

  async findAll(): Promise<Array<UserEntity>> {
    const users = await this.prismaService.user.findMany();

    return users.map((user) => UserEntity.fromPrisma(user));
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    return UserEntity.fromPrisma(user);
  }

  async findOneBy(where: Partial<User>): Promise<UserEntity> {
    const user = await this.prismaService.user.findUnique({ where });

    return UserEntity.fromPrisma(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });

    return UserEntity.fromPrisma(user);
  }

  async remove(id: number): Promise<UserEntity> {
    const user = await this.prismaService.user.delete({
      where: {
        id,
      },
    });

    return UserEntity.fromPrisma(user);
  }
}
