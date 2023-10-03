import { PrismaClient } from '@prisma/client';

export class BaseSeed {
  entities: any[];
  prismaRepository: any;
  sampleGenerator?: () => any;

  constructor(entities: any[], prismaRepository: any) {
    this.entities = entities;
    this.prismaRepository = new PrismaClient()[prismaRepository];
  }

  public async seed() {
    await Promise.all(
      this.entities.map(async (entity) => {
        await this.prismaRepository.create({
          data: entity,
        });
      }),
    );
  }

  public async clear() {
    Promise.all(
      this.entities.map(async (entity) => {
        const found = await this.prismaRepository.findFirst({
          where: entity,
        });

        if (!found) return;

        await this.prismaRepository.delete({ where: { id: found.id } });
      }),
    );
  }

  public async reset() {
    await this.clear();
    await this.seed();
  }

  public async createSample() {
    if (this.sampleGenerator) {
      return await this.prismaRepository.create({
        data: this.sampleGenerator(),
      });
    }

    const entity = this.entities[0];
    return await this.prismaRepository.create({
      data: entity,
    });
  }

  public async generateSample() {
    if (this.sampleGenerator) {
      return this.sampleGenerator();
    }

    return this.entities[0];
  }
}
