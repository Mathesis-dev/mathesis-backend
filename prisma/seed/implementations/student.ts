import { faker } from '@faker-js/faker';
import { Student } from '@prisma/client';
import StudentEntity from 'src/modules/student/domain/entities/student.entity';
import { BaseSeed } from '../base-seed.blueprint';

const STUDENTS: Array<Partial<StudentEntity>> = [
  {
    id: 1,
    userId: 2,
  },
];

export class StudentSeed extends BaseSeed {
  constructor() {
    super(STUDENTS, 'student');
  }

  sampleGenerator = (): Student => {
    return {
      id: faker.number.int(),
      userId: faker.number.int(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      deletedAt: null,
    };
  };
}
