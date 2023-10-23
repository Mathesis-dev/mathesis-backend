import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { UserCategoryEnum } from '../enums/user-category.enum';
import { UserGenderEnum } from '../enums/user-gender.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'Fulano da Silva',
  })
  @IsString({ message: 'Nome completo inválido' })
  @IsNotEmpty({ message: 'Nome completo é obrigatório' })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'fulano@gmail.com',
  })
  @IsString({ message: 'Email inválido' })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @ApiProperty({ description: 'Senha do usuário', example: 'Teste123@' })
  @IsString({ message: 'Senha inválida' })
  @IsNotEmpty({ message: 'Senha é obrigatório' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 2,
      minSymbols: 1,
      minUppercase: 1,
    },
    { message: 'A senha é fraca demais' },
  )
  password: string;

  @ApiProperty({
    enum: UserCategoryEnum,
    description: 'Categoria do usuário',
    example: UserCategoryEnum.Teacher,
  })
  @IsEnum(UserCategoryEnum, { message: 'Categoria inválida' })
  @IsNotEmpty({ message: 'Categoria é obrigatório' })
  category: UserCategoryEnum;

  @ApiProperty({
    enum: UserGenderEnum,
    description: 'Gênero do usuário',
    example: UserGenderEnum.Male,
  })
  @IsEnum(UserGenderEnum, { message: 'Gênero inválido' })
  @IsNotEmpty({ message: 'Gênero é obrigatório' })
  gender: UserGenderEnum;
}
