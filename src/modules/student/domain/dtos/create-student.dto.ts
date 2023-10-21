import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
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

  // TODO - validar como funciona no DTO para o favoriteTeachers
  @ApiPropertyOptional({
    description: 'Professores favoritados pelo aluno',
    type: TeacherEntity,
    isArray: true,
  })
  @ValidateNested({ each: true })
  @Type(() => TeacherEntity)
  favoriteTeachers?: Array<TeacherEntity>;
}
