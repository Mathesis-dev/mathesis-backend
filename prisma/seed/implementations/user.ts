import { BaseSeed } from '../base-seed.blueprint';
import { UserCategoryEnum, User } from '@prisma/client';
import { faker } from '@faker-js/faker';
import UserEntity from 'src/modules/user/domain/entities/user.entity';

const USERS: Array<Partial<UserEntity>> = [
  {
    name: 'Teste Professor',
    email: 'testeprofessor@gmail.com',
    password: 'Teste123@',
    category: UserCategoryEnum.TEACHER,
  },
  {
    name: 'Teste Aluno',
    email: 'testealuno@gmail.com',
    password: 'Teste123@',
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
