import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class FavoriteTeacherDto {
  @ApiProperty({
    description: 'ID do estudante',
    example: 1,
  })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'ID do estudante' },
  )
  @IsNotEmpty({ message: 'ID do estudante' })
  studentId: number;

  @ApiProperty({
    description: 'ID do professor',
    example: 1,
  })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'ID do professor' },
  )
  @IsNotEmpty({ message: 'ID do professor' })
  teacherId: number;
}
