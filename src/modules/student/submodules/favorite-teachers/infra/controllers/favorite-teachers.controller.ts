import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { FindAllResponseDto } from 'src/shared/dtos/find-all-response.dto';
import { FavoriteTeacherDto } from '../../domain/dtos/favorite-teacher.dto';
import { ListFavoriteTeachersParamsDto } from '../../domain/dtos/list-favorite-teachers-params.dto';

import { FavoriteTeachersService } from '../../services/favorite-teachers.service';

import FavoriteTeachersEntity from '../../domain/entities/favorite-teachers.entity';

@ApiBearerAuth()
@ApiTags('Favorite Teachers')
@Controller('favorite-teachers')
export class FavoriteTeachersController {
  constructor(
    private readonly favoriteTeachersService: FavoriteTeachersService,
  ) {}

  @ApiOperation({
    summary: 'Listar os professores favoritados de um estudante',
    description: 'Lista os professores favoritados de um estudante',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Professores favoritados encontrados com sucesso',
  })
  @Get()
  findAll(
    @Query() params: ListFavoriteTeachersParamsDto,
  ): Promise<FindAllResponseDto<Array<FavoriteTeachersEntity>>> {
    return this.favoriteTeachersService.findAll(params);
  }

  @ApiOperation({
    summary: 'Favoritar um professor',
    description: 'Favorita um professor',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'O professor foi favoritado com sucesso',
  })
  @Post()
  create(
    @Body() favoriteTeacherDto: FavoriteTeacherDto,
  ): Promise<FavoriteTeachersEntity> {
    return this.favoriteTeachersService.create(favoriteTeacherDto);
  }

  @ApiOperation({
    summary: 'Desfavoritar um professor',
    description: 'Desfavorita um professor',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Professor desfavoritado com sucesso',
  })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<FavoriteTeachersEntity> {
    return this.favoriteTeachersService.remove(id);
  }
}
