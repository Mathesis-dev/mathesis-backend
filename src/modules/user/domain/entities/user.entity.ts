import { GenderEnum, Prisma, Student, Teacher } from '@prisma/client';
import StudentEntity from 'src/modules/student/domain/entities/student.entity';
import TeacherEntity from 'src/modules/teacher/domain/entities/teacher.entity';

const userWithRelations = Prisma.validator<Prisma.UserArgs>()({
  include: { student: true, teacher: true },
});

type User = Prisma.UserGetPayload<typeof userWithRelations> & {
  student?: Student;
  teacher?: Teacher;
};

export default class UserEntity {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly category: string;
  readonly gender: GenderEnum;
  readonly teacher?: TeacherEntity;
  readonly student?: StudentEntity;
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
    teacher,
    student,
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
    this.teacher = teacher;
    this.student = student;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static fromPrisma(user: User): UserEntity {
    if (!user) return null;

    return new UserEntity({
      ...user,
      teacher: user.teacher ? new TeacherEntity(user.teacher) : undefined,
      student: user.student ? new StudentEntity(user.student) : undefined,
    });
  }
}
