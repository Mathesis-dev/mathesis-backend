import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SubjectEnum, WeekdayEnum } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateScheduleDto {
  @ApiPropertyOptional({
    description: 'ID da matéria',
    example: 1,
  })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'ID da matéria em formato inválido' },
  )
  @IsOptional({ message: 'ID da matéria é opcional' })
  id?: number;

  @ApiProperty({
    description: 'Nome da matéria (em inglês)',
    example: SubjectEnum.MATH,
    enum: SubjectEnum,
  })
  @IsEnum(SubjectEnum, { message: 'Matéria inválida' })
  @IsNotEmpty({ message: 'Matéria é obrigatória' })
  subject: SubjectEnum;

  @ApiProperty({
    description: 'Dia que será dada a matéria (em inglês)',
    example: WeekdayEnum.MONDAY,
    enum: WeekdayEnum,
  })
  @IsEnum(WeekdayEnum, { message: 'Dia da matéria inválida' })
  @IsNotEmpty({ message: 'Dia da matéria é obrigatória' })
  weekDay: WeekdayEnum;

  @ApiProperty({
    description: 'Horário que será dada a matéria',
    example: '08:00',
  })
  @IsString({ message: 'Horário em formato inválido' })
  @IsNotEmpty({ message: 'Horário é obrigatório' })
  from: string;

  @ApiProperty({
    description: 'Horário final que será dada a matéria',
    example: '12:00',
  })
  @IsString({ message: 'Horário final em formato inválido' })
  @IsNotEmpty({ message: 'Horário final é obrigatório' })
  to: string;

  @ApiProperty({
    description: 'Valor da aula',
    example: 1500,
  })
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 },
    { message: 'Valor em formato inválido' },
  )
  @IsNotEmpty({ message: 'Valor é obrigatório' })
  cost: number;

  @ApiProperty({
    description: 'ID do professor',
    example: 1,
  })
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: 'ID do professor em formato inválido' },
  )
  @IsNotEmpty({ message: 'ID do professor é obrigatório' })
  teacherId: number;

  @ApiProperty({
    description: 'Define se a aula é online',
    example: true,
  })
  @IsBoolean({ message: 'Aula online em formato inválido' })
  @IsNotEmpty({ message: 'Campo onlineClass é obrigatório' })
  onlineClass: boolean;

  @ApiProperty({
    description: 'Define se a aula é presencial',
    example: true,
  })
  @IsBoolean({ message: 'Aula presencial em formato inválido' })
  @IsNotEmpty({ message: 'Campo inPersonClass é obrigatório' })
  inPersonClass: boolean;
}
