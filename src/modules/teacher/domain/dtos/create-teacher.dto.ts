import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { CreateScheduleDto } from '../../submodules/schedules/domain/dtos/create-schedule.dto';

export class CreateTeacherDto {
  @ApiProperty({
    description: 'Whatsapp do professor',
    example: '+55 (48) 99966-6173',
  })
  @IsString({ message: 'Telefone inválido' })
  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  @IsPhoneNumber('BR', { message: 'Telefone inválido' })
  phone: string;

  @ApiProperty({
    description: 'Biografia do professor',
    example:
      'Trabalho há 10 anos dando aulas de matemática. Já trabalhei nas universidades X e Y. Sou formado em engenharia.',
  })
  @IsString({ message: 'Biografia em formato inválido' })
  @IsNotEmpty({ message: 'Biografia é obrigatória' })
  biography: string;

  @ApiProperty({
    description: 'Cronograma de aulas do professor',
    type: Array<CreateScheduleDto>,
    isArray: true,
  })
  @IsObject({ message: 'Cronograma em formato inválido' }) // TODO - Trocar por array de objetos
  @IsNotEmpty({ message: 'Cronograma é obrigatório' })
  schedules: Array<CreateScheduleDto>;

  @ApiProperty({
    description: 'ID do usuário',
    example: 1,
  })
  @IsNumber({ allowNaN: false }, { message: 'ID do usuário inválido' })
  @IsNotEmpty({ message: 'ID do usuário é obrigatório' })
  userId: number;

  @ApiProperty({
    description: 'Cidade do professor',
    example: 'Tubarão',
  })
  @IsString({ message: 'Cidade em formato inválido' })
  @IsNotEmpty({ message: 'Cidade é obrigatória' })
  city: string;

  @ApiProperty({
    description: 'Estado do professor',
    example: 'Santa Catarina',
  })
  @IsString({ message: 'Estado em formato inválido' })
  @IsNotEmpty({ message: 'Estado é obrigatório' })
  state: string;
}
