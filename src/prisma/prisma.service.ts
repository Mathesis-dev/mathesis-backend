import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    //soft delete
    this.$use(async (params, next) => {
      switch (params.action) {
        case 'findUnique':
        case 'findFirst':
          params.action = 'findFirst';
          params.args.where['deleted_at'] = null;
          break;
        case 'findMany':
          if (!params.args.where) {
            params.args.where = { deleted_at: null };
          } else if (params.args.where.deleted === undefined) {
            params.args.where['deleted_at'] = null;
          }
          break;
        case 'delete':
          params.action = 'update';
          params.args.data = { deleted_at: this.getCurrentDate() };
          break;
        case 'deleteMany':
          params.action = 'updateMany';
          if (params.args.data === undefined) {
            params.args.data = { deleted_at: this.getCurrentDate() };
          } else {
            params.args.data['deleted_at'] = this.getCurrentDate();
          }
          break;
      }

      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  getCurrentDate() {
    const date = new Date();
    return date.toISOString();
  }
}
