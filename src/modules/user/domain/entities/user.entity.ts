import { GenderEnum, User } from '@prisma/client';

export default class UserEntity {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly category: string;
  readonly gender: GenderEnum;
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
  }: UserEntity) {
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
      ...user,
    });
  }
}
