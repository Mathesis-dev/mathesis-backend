import { ListParamsDto } from 'src/shared/dtos/list-params.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserCategoryEnum } from '../enums/user-category.enum';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

export class ListUserParamsDto extends ListParamsDto {
  @ApiPropertyOptional({
    description: 'Busca pelo nome do usuário',
  })
  @Type(() => String)
  @IsOptional()
  readonly search?: string;

  @ApiPropertyOptional({
    enum: UserCategoryEnum,
    description: 'Busca pela categoria do usuário',
  })
  @IsEnum(UserCategoryEnum)
  @IsOptional()
  public category?: UserCategoryEnum;
}
