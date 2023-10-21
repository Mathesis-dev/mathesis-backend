import { BaseSeed } from '../base-seed.blueprint';
import { Teacher } from '@prisma/client';
import { faker } from '@faker-js/faker';
import TeacherEntity from 'src/modules/teacher/domain/entities/teacher.entity';

const TEACHERS: Array<Partial<TeacherEntity>> = [
  {
    phone: '+55 (48) 99999-9999',
    biography:
      'Sou um professor de matemática muito bom e trabalho na área há 10 anos.',
    userId: 1,
    city: 'Tubarão',
    state: 'Santa Catarina',
    badReviews: 0,
    mediumReviews: 0,
    goodReviews: 10,
  },
];

export class TeacherSeed extends BaseSeed {
  constructor() {
    super(TEACHERS, 'teacher');
  }

  sampleGenerator = (deletedAt?: Date): Teacher => {
    return {
      id: faker.number.int(),
      phone: '+55 (48) 99999-9999',
      biography: faker.lorem.paragraph(),
      userId: 1,
      city: faker.location.city(),
      state: faker.location.state(),
      badReviews: faker.number.int(),
      mediumReviews: faker.number.int(),
      goodReviews: faker.number.int(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      deletedAt: deletedAt ?? null,
    };
  };
}
