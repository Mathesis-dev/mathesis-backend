import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ListParamsDto } from 'src/shared/dtos/list-params.dto';

// TODO - Filtrar por estado, cidade, matéria, preço e review
export class ListTeacherParamsDto extends ListParamsDto {
  @ApiPropertyOptional({
    description: 'Busca pelo nome do professor',
  })
  @Type(() => String)
  @IsOptional()
  readonly search?: string;
}
