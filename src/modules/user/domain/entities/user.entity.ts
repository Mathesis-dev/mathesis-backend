import { User } from '@prisma/client';
import { UserGenderEnum } from '../enums/user-gender.enum';

export default class UserEntity {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly category: string;
  readonly gender: UserGenderEnum;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;

  constructor({
    id,
    name,
    email,
    password,
    category,
    gender,
    createdAt,
    updatedAt,
    deletedAt,
  }: {
    id: number;
    name: string;
    email: string;
    password: string;
    category: string;
    gender: UserGenderEnum;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.category = category;
    this.gender = gender;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static fromPrisma(user: User): UserEntity {
    if (!user) return null;

    return new UserEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      category: user.category,
      gender: user.gender,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    });
  }
}
