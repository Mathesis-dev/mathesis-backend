import { faker } from '@faker-js/faker';
import { SubjectEnum, TeachingSchedules } from '@prisma/client';
import ScheduleEntity from 'src/modules/teacher/submodules/schedules/domain/entities/schedule.entity';
import { BaseSeed } from '../base-seed.blueprint';

const SCHEDULES: Array<Partial<ScheduleEntity>> = [
  {
    subject: faker.helpers.enumValue(SubjectEnum),
    cost: faker.number.float(),
    teacherId: 1,
    onlineClass: faker.datatype.boolean(),
    inPersonClass: faker.datatype.boolean(),
  },
];

export class ScheduleSeed extends BaseSeed {
  constructor() {
    super(SCHEDULES, 'teachingSchedules');
  }

  sampleGenerator = (deletedAt?: Date): TeachingSchedules => {
    const onlineClass = faker.datatype.boolean();
    const inPersonClass = onlineClass ? false : faker.datatype.boolean();

    return {
      id: faker.number.int(),
      subject: faker.helpers.enumValue(SubjectEnum),
      cost: faker.number.float(),
      teacherId: 1,
      onlineClass,
      inPersonClass,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      deletedAt: deletedAt ?? null,
    };
  };
}
