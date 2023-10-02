import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { UserSeed } from './implementations/user';

export const seed = async () => {
  console.log('🍃 Started seeding ...');
  new UserSeed().reset();
};

seed()
  .then(async () => {
    await prisma.$disconnect();
    console.log('🌱 Seeding finished.');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
