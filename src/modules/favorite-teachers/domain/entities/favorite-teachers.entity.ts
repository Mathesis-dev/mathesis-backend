import { Prisma, Student, Teacher } from '@prisma/client';

import StudentEntity from 'src/modules/student/domain/entities/student.entity';
import TeacherEntity from 'src/modules/teacher/domain/entities/teacher.entity';

const favoriteTeachersWithRelations =
  Prisma.validator<Prisma.FavoriteTeachersArgs>()({
    include: { student: true, teacher: true },
  });

type FavoriteTeachers = Prisma.FavoriteTeachersGetPayload<
  typeof favoriteTeachersWithRelations
> & {
  student?: Student;
  teacher?: Teacher;
};

export default class FavoriteTeachersEntity {
  readonly id: number;
  readonly studentId: number;
  readonly student?: StudentEntity;
  readonly teacherId: number;
  readonly teacher?: TeacherEntity;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;

  constructor({
    id,
    studentId,
    student,
    teacherId,
    teacher,
    createdAt,
    updatedAt,
    deletedAt,
  }: FavoriteTeachersEntity) {
    this.id = id;
    this.studentId = studentId;
    this.student = student;
    this.teacherId = teacherId;
    this.teacher = teacher;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static fromPrisma(favoriteTeacher: FavoriteTeachers): FavoriteTeachersEntity {
    if (!favoriteTeacher) return null;

    return new FavoriteTeachersEntity({
      ...favoriteTeacher,
      student: favoriteTeacher.student
        ? new StudentEntity(favoriteTeacher.student)
        : undefined,
      teacher: favoriteTeacher.teacher
        ? new TeacherEntity(favoriteTeacher.teacher)
        : undefined,
    });
  }
}
