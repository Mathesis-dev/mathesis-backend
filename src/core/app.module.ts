import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { JwtAuthGuard } from 'src/modules/auth/domain/guards/jwt-auth.guard';
import { UserModule } from 'src/modules/user/user.module';
import { ConfigModule } from './config/config.module';
import { TeacherModule } from 'src/modules/teacher/teacher.module';
import { SchedulesModule } from 'src/modules/teacher/submodules/schedules/schedules.module';
import { StudentModule } from 'src/modules/student/student.module';
import { FavoriteTeachersModule } from 'src/modules/student/submodules/favorite-teachers/favorite-teachers.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    UserModule,
    AuthModule,
    TeacherModule,
    SchedulesModule,
    StudentModule,
    FavoriteTeachersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
