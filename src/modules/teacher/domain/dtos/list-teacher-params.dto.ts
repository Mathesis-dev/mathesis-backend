import { ApiPropertyOptional } from '@nestjs/swagger';
import { SubjectEnum } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ListParamsDto } from 'src/shared/dtos/list-params.dto';

export class ListTeacherParamsDto extends ListParamsDto {
  @ApiPropertyOptional({
    description: 'Busca pelo nome do professor',
  })
  @Type(() => String)
  @IsOptional()
  readonly search?: string;

  @ApiPropertyOptional({
    description: 'Busca pelo estado do professor',
  })
  @Type(() => String)
  @IsOptional()
  readonly state?: string;

  @ApiPropertyOptional({
    description: 'Busca pela cidade do professor',
  })
  @Type(() => String)
  @IsOptional()
  readonly city?: string;

  @ApiPropertyOptional({
    description: 'Busca pela matéria do professor',
  })
  @Type(() => String)
  @IsOptional()
  readonly subject?: SubjectEnum;
}
