import { Prisma, TeachingSchedules, User } from '@prisma/client';
import UserEntity from 'src/modules/user/domain/entities/user.entity';
import ScheduleEntity from '../../submodules/schedules/domain/entities/schedule.entity';

const teacherWithRelations = Prisma.validator<Prisma.TeacherArgs>()({
  include: { schedules: true, user: true },
});

type Teacher = Prisma.TeacherGetPayload<typeof teacherWithRelations> & {
  schedules?: Array<TeachingSchedules>;
  user?: User;
};

export default class TeacherEntity {
  readonly id: number;
  readonly phone: string;
  readonly biography: string;
  readonly schedules?: Array<ScheduleEntity>;
  readonly userId: number;
  readonly user?: UserEntity;
  readonly city: string;
  readonly state: string;
  readonly badReviews: number;
  readonly mediumReviews: number;
  readonly goodReviews: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;

  constructor({
    id,
    phone,
    biography,
    schedules,
    userId,
    user,
    city,
    state,
    badReviews,
    mediumReviews,
    goodReviews,
    createdAt,
    updatedAt,
    deletedAt,
  }: TeacherEntity) {
    this.id = id;
    this.phone = phone;
    this.biography = biography;
    this.schedules = schedules;
    this.userId = userId;
    this.user = user;
    this.city = city;
    this.state = state;
    this.badReviews = badReviews;
    this.mediumReviews = mediumReviews;
    this.goodReviews = goodReviews;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static fromPrisma(teacher: Teacher): TeacherEntity {
    if (!teacher) return null;

    return new TeacherEntity({
      ...teacher,
      schedules: teacher.schedules
        ? teacher.schedules.map((schedule) => new ScheduleEntity(schedule))
        : [],
      user: teacher.user ? new UserEntity(teacher.user) : undefined,
    });
  }
}
