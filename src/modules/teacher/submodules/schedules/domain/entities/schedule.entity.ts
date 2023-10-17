import {
  SubjectEnum,
  Teacher,
  TeachingSchedules,
  WeekdayEnum,
} from '@prisma/client';
import TeacherEntity from 'src/modules/teacher/domain/entities/teacher.entity';

export default class ScheduleEntity {
  readonly id: number;
  readonly subject: SubjectEnum;
  readonly weekDay: WeekdayEnum;
  readonly from: string;
  readonly to: string;
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
    weekDay,
    from,
    to,
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
    weekDay: WeekdayEnum;
    from: string;
    to: string;
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
    this.weekDay = weekDay;
    this.from = from;
    this.to = to;
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
      weekDay: schedule.weekDay,
      from: schedule.from,
      to: schedule.to,
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
