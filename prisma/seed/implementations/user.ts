import { BaseSeed } from '../base-seed.blueprint';
import { UserCategoryEnum, User } from '@prisma/client';
import { faker } from '@faker-js/faker';

export class UserSeed extends BaseSeed {
  constructor() {
    super([], 'users');
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
