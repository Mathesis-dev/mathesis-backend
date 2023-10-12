import { Teacher, User } from '@prisma/client';
import UserEntity from 'src/modules/user/domain/entities/user.entity';

export default class TeacherEntity {
  readonly id: number;
  readonly phone: string;
  readonly biography: string;
  // readonly schedules: Array<TeachingSchedulesEntity>; // TODO - Adicionar schedules
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

  static fromPrisma(teacher: Teacher, user: User): TeacherEntity {
    if (!teacher) return null;

    return new TeacherEntity({
      id: teacher.id,
      phone: teacher.phone,
      biography: teacher.biography,
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
