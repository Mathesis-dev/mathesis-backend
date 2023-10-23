import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import UserEntity from '../../domain/entities/user.entity';

import { FindAllResponseDto } from 'src/shared/dtos/find-all-response.dto';
import { CreateUserDto } from '../../domain/dtos/create-user.dto';
import { ListUserParamsDto } from '../../domain/dtos/list-user-params.dto';
import { UpdateUserDto } from '../../domain/dtos/update-user.dto';
import { UserCategoryEnum } from '../../domain/enums/user-category.enum';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { teacher } = createUserDto;

    const user = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        teacher: {
          create:
            createUserDto.category === UserCategoryEnum.Teacher
              ? {
                  ...teacher,
                  schedules: {
                    createMany: {
                      data: teacher?.schedules ?? undefined,
                    },
                  },
                }
              : undefined,
        },
        student: {
          create:
            createUserDto.category === UserCategoryEnum.Student
              ? {
                  favoriteTeachers: undefined,
                }
              : undefined,
        },
      },
      include: { student: true, teacher: true },
    });

    return UserEntity.fromPrisma({ ...user, password: undefined });
  }

  async findAll(
    params: ListUserParamsDto,
  ): Promise<FindAllResponseDto<Array<UserEntity>>> {
    const skip = params.skip ? +params.skip : undefined;
    const take = params.take ? +params.take : undefined;
    const orderBy = params.orderBy ?? 'id';
    const ordering = params.ordering ?? 'desc';

    const [total, prismaUsers] = await this.prismaService.$transaction([
      this.prismaService.user.count({
        where: {
          name: { contains: params.search, mode: 'insensitive' },
        },
      }),
      this.prismaService.user.findMany({
        skip: skip,
        take: take,
        where: {
          name: { contains: params.search, mode: 'insensitive' },
        },
        orderBy: {
          [orderBy]: ordering,
        },
        include: {
          student: true,
          teacher: true,
        },
      }),
    ]);

    const users = prismaUsers.map((user) =>
      UserEntity.fromPrisma({ ...user, password: undefined }),
    );

    return {
      data: users,
      total: total,
      pages: take ? Math.round(total / take) : 0,
    };
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        student: true,
        teacher: true,
      },
    });

    return UserEntity.fromPrisma({ ...user, password: undefined });
  }

  async findOneBy(
    where: Partial<User>,
    removePassword = true,
  ): Promise<UserEntity> {
    const user = await this.prismaService.user.findUnique({
      where,
      include: {
        student: true,
        teacher: true,
      },
    });

    return UserEntity.fromPrisma({
      ...user,
      password: removePassword ? undefined : user.password,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
        teacher: undefined,
        student: undefined,
      },
      include: {
        student: true,
        teacher: true,
      },
    });

    return UserEntity.fromPrisma({ ...user, password: undefined });
  }

  async remove(id: number): Promise<UserEntity> {
    const user = await this.prismaService.user.delete({
      where: {
        id,
      },
      include: {
        student: true,
        teacher: true,
      },
    });

    return UserEntity.fromPrisma({ ...user, password: undefined });
  }
}
