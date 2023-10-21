import { Prisma } from '@prisma/client';
import TeacherEntity from 'src/modules/teacher/domain/entities/teacher.entity';
import UserEntity from 'src/modules/user/domain/entities/user.entity';

const studentWithRelations = Prisma.validator<Prisma.StudentArgs>()({
  include: { favoriteTeachers: true, user: true },
});

type Student = Prisma.StudentGetPayload<typeof studentWithRelations>;

export default class StudentEntity {
  readonly id: number;
  readonly userId: number;
  readonly user: UserEntity;
  readonly favoriteTeachers: Array<TeacherEntity>;
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
      user: UserEntity.fromPrisma(student.user),
      favoriteTeachers: student.favoriteTeachers.map((teacher) =>
        TeacherEntity.fromPrisma(teacher),
      ),
    });
  }
}
