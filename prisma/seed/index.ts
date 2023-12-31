import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { UserSeed } from './implementations/user';
import { TeacherSeed } from './implementations/teacher';
import { ScheduleSeed } from './implementations/schedule';
import { StudentSeed } from './implementations/student';

export const seed = async () => {
  console.log('🍃 Started seeding ...');
  new UserSeed().reset();
  new TeacherSeed().reset();
  new ScheduleSeed().reset();
  new StudentSeed().reset();
};

seed()
  .then(async () => {
    await prisma.$disconnect();
    console.log('🌱 Seeding finished.');
  })
  .catch(async (e) => {
    console.error('🌱⚠️ Seeding error ->', e);
    await prisma.$disconnect();
    process.exit(1);
  });
