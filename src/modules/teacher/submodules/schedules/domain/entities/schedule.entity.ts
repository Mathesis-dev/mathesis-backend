import { SubjectEnum, Teacher, TeachingSchedules } from '@prisma/client';
import TeacherEntity from 'src/modules/teacher/domain/entities/teacher.entity';

export default class ScheduleEntity {
  readonly id: number;
  readonly subject: SubjectEnum;
  readonly cost: number;
  readonly teacherId: number;
  readonly teacher: TeacherEntity;
  readonly onlineClass: boolean;
  readonly inPersonClass: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;

  constructor({
    id,
    subject,
    cost,
    teacherId,
    teacher,
    onlineClass,
    inPersonClass,
    createdAt,
    updatedAt,
    deletedAt,
  }: {
    id: number;
    subject: SubjectEnum;
    cost: number;
    teacherId: number;
    teacher: TeacherEntity;
    onlineClass: boolean;
    inPersonClass: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }) {
    this.id = id;
    this.subject = subject;
    this.cost = cost;
    this.teacherId = teacherId;
    this.teacher = teacher;
    this.onlineClass = onlineClass;
    this.inPersonClass = inPersonClass;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static fromPrisma(
    schedule: TeachingSchedules,
    teacher: Teacher,
  ): ScheduleEntity {
    if (!schedule || !teacher) return null;

    return new ScheduleEntity({
      id: schedule.id,
      subject: schedule.subject,
      cost: schedule.cost,
      teacherId: schedule.teacherId,
      teacher: TeacherEntity.fromPrisma(teacher, null, null),
      onlineClass: schedule.onlineClass,
      inPersonClass: schedule.inPersonClass,
      createdAt: schedule.createdAt,
      updatedAt: schedule.updatedAt,
      deletedAt: schedule.deletedAt,
    });
  }
}
