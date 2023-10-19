import { BaseSeed } from '../base-seed.blueprint';
import { UserCategoryEnum, User } from '@prisma/client';
import { faker } from '@faker-js/faker';
import UserEntity from 'src/modules/user/domain/entities/user.entity';
import { UserGenderEnum } from 'src/modules/user/domain/enums/user-gender.enum';

const USERS: Array<Partial<UserEntity>> = [
  {
    name: 'Teste Professor',
    email: 'testeprofessor@gmail.com',
    password: '$2b$10$l7hl8O5T474n2ZD6m5QBB.9xrBlNnobHFtuSRSSnSGGrGVT/poB9C',
    category: UserCategoryEnum.TEACHER,
    gender: UserGenderEnum.Male,
  },
  {
    name: 'Teste Aluna',
    email: 'testealuna@gmail.com',
    password: '$2b$10$l7hl8O5T474n2ZD6m5QBB.9xrBlNnobHFtuSRSSnSGGrGVT/poB9C',
    category: UserCategoryEnum.STUDENT,
    gender: UserGenderEnum.Female,
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
      gender: faker.helpers.enumValue(UserGenderEnum),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      deletedAt: null,
    };
  };
}
