import { BaseSeed } from '../base-seed.blueprint';
import { UserCategoryEnum, User } from '@prisma/client';
import { faker } from '@faker-js/faker';
import UserEntity from 'src/modules/user/domain/entities/user.entity';

const USERS: Array<Partial<UserEntity>> = [
  {
    name: 'Teste Professor',
    email: 'testeprofessor@gmail.com',
    password: '$2b$10$l7hl8O5T474n2ZD6m5QBB.9xrBlNnobHFtuSRSSnSGGrGVT/poB9C',
    category: UserCategoryEnum.TEACHER,
  },
  {
    name: 'Teste Aluno',
    email: 'testealuno@gmail.com',
    password: '$2b$10$l7hl8O5T474n2ZD6m5QBB.9xrBlNnobHFtuSRSSnSGGrGVT/poB9C',
    category: UserCategoryEnum.STUDENT,
  },
];

export class UserSeed extends BaseSeed {
  constructor() {
    super(USERS, 'user');
  }

  sampleGenerator = (): User => {
    return {
      id: faker.number.int(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      category: faker.helpers.enumValue(UserCategoryEnum),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      deletedAt: null,
    };
  };
}
