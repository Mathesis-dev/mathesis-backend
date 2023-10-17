import { Teacher, TeachingSchedules, User } from '@prisma/client';
import UserEntity from 'src/modules/user/domain/entities/user.entity';
import ScheduleEntity from '../../submodules/schedules/domain/entities/schedule.entity';

export default class TeacherEntity {
  readonly id: number;
  readonly phone: string;
  readonly biography: string;
  readonly schedules: Array<ScheduleEntity>;
  readonly userId: number;
  readonly user: UserEntity;
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
  }: {
    id: number;
    phone: string;
    biography: string;
    schedules: Array<ScheduleEntity>;
    userId: number;
    user: UserEntity;
    city: string;
    state: string;
    badReviews: number;
    mediumReviews: number;
    goodReviews: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }) {
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

  static fromPrisma(
    teacher: Teacher,
    user: User,
    schedules: Array<TeachingSchedules>,
  ): TeacherEntity {
    if (!teacher) return null;

    return new TeacherEntity({
      id: teacher.id,
      phone: teacher.phone,
      biography: teacher.biography,
      schedules: schedules
        ? schedules.map((schedule) =>
            ScheduleEntity.fromPrisma(schedule, teacher),
          )
        : [],
      userId: teacher.userId,
      user: UserEntity.fromPrisma(user),
      city: teacher.city,
      state: teacher.state,
      badReviews: teacher.badReviews,
      mediumReviews: teacher.mediumReviews,
      goodReviews: teacher.goodReviews,
      createdAt: teacher.createdAt,
      updatedAt: teacher.updatedAt,
      deletedAt: teacher.deletedAt,
    });
  }
}
