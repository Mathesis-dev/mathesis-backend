import { Student } from '@prisma/client';

export default class StudentEntity {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly category: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;

  constructor({
    id,
    name,
    email,
    password,
    category,
    createdAt,
    updatedAt,
    deletedAt,
  }: {
    id: number;
    name: string;
    email: string;
    password: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.category = category;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static fromPrisma(student: Student): StudentEntity {
    if (!student) return null;

    return new StudentEntity({
      id: student.id,
      name: student.name,
      email: student.email,
      password: student.password,
      category: student.category,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
      deletedAt: student.deletedAt,
    });
  }
}
