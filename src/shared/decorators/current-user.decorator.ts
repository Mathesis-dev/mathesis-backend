import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from 'src/modules/auth/domain/interfaces/auth-request.interface';
import UserEntity from 'src/modules/user/domain/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
