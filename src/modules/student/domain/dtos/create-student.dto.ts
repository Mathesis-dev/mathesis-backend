import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import TeacherEntity from 'src/modules/teacher/domain/entities/teacher.entity';

export class CreateStudentDto {
  @ApiProperty({
    description: 'ID do usuário relacionado',
    example: 1,
  })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'ID do usuário inválido' },
  )
  @IsNotEmpty({ message: 'ID do usuário é obrigatório' })
  userId: number;

  @ApiPropertyOptional({
    description: 'Professores favoritados pelo aluno',
    type: TeacherEntity,
    isArray: true,
  })
  @IsArray({ message: 'Professores favoritados precisa ser array' })
  favoriteTeachers?: Array<TeacherEntity>;
}
