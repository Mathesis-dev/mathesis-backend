import { FavoriteTeachers, Prisma, User } from '@prisma/client';

import FavoriteTeachersEntity from 'src/modules/favorite-teachers/domain/entities/favorite-teachers.entity';
import UserEntity from 'src/modules/user/domain/entities/user.entity';

const studentWithRelations = Prisma.validator<Prisma.StudentArgs>()({
  include: { favoriteTeachers: true, user: true },
});

type Student = Prisma.StudentGetPayload<typeof studentWithRelations> & {
  favoriteTeachers?: Array<FavoriteTeachers>;
  user?: User;
};

export default class StudentEntity {
  readonly id: number;
  readonly userId: number;
  readonly user?: UserEntity;
  readonly favoriteTeachers?: Array<FavoriteTeachersEntity>;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;

  constructor({
    id,
    userId,
    user,
    favoriteTeachers,
    createdAt,
    updatedAt,
    deletedAt,
  }: StudentEntity) {
    this.id = id;
    this.userId = userId;
    this.user = user;
    this.favoriteTeachers = favoriteTeachers;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static fromPrisma(student: Student): StudentEntity {
    if (!student) return null;

    return new StudentEntity({
      ...student,
      user: student.user ? new UserEntity(student.user) : undefined,
      favoriteTeachers: student.favoriteTeachers
        ? student.favoriteTeachers.map((teacher) =>
            teacher ? new FavoriteTeachersEntity(teacher) : undefined,
          )
        : [],
    });
  }
}
