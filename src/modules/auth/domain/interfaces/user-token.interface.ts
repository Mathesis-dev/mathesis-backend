import UserEntity from 'src/modules/user/domain/entities/user.entity';

export interface UserToken {
  access_token: string;
  user: UserEntity;
}
