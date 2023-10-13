import { ApiPropertyOptional } from '@nestjs/swagger';
import { SubjectEnum } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { ListParamsDto } from 'src/shared/dtos/list-params.dto';

export class ListScheduleParamsDto extends ListParamsDto {
  @ApiPropertyOptional({
    description: 'Busca pelo nome da matéria',
  })
  @Type(() => String)
  @IsOptional()
  readonly search?: string;

  @ApiPropertyOptional({
    description: 'Busca pela matéria',
  })
  @IsEnum(SubjectEnum, { message: 'Matéria inválida' })
  @IsOptional()
  readonly subject?: SubjectEnum;
}
