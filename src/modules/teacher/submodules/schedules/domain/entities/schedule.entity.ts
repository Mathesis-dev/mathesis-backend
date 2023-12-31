import { Prisma, SubjectEnum, Teacher } from '@prisma/client';
import TeacherEntity from 'src/modules/teacher/domain/entities/teacher.entity';

const scheduleWithRelations = Prisma.validator<Prisma.TeachingSchedulesArgs>()({
  include: { teacher: true },
});

type TeachingSchedules = Prisma.TeachingSchedulesGetPayload<
  typeof scheduleWithRelations
> & {
  teacher?: Teacher;
};

export default class ScheduleEntity {
  readonly id: number;
  readonly subject: SubjectEnum;
  readonly cost: number;
  readonly teacherId: number;
  readonly teacher?: TeacherEntity;
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
  }: ScheduleEntity) {
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

  static fromPrisma(schedule: TeachingSchedules): ScheduleEntity {
    if (!schedule) return null;

    return new ScheduleEntity({
      ...schedule,
      teacher: schedule.teacher
        ? new TeacherEntity(schedule.teacher)
        : undefined,
    });
  }
}
