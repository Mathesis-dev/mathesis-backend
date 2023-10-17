import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
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

import { TeacherSeed } from 'prisma/seed/implementations/teacher';

import { Public } from 'src/shared/decorators/public.decorator';

import { CreateTeacherDto } from '../../domain/dtos/create-teacher.dto';
import { ListTeacherParamsDto } from '../../domain/dtos/list-teacher-params.dto';
import { UpdateTeacherDto } from '../../domain/dtos/update-teacher.dto';

import TeacherEntity from '../../domain/entities/teacher.entity';

import { TeacherService } from '../../services/teacher.service';

@ApiBearerAuth()
@ApiTags('Teachers')
@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiOperation({
    summary: 'Cadastrar um professor',
    description: 'Cadastra um professor',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'O professor foi cadastrado com sucesso',
    schema: {
      example: new TeacherSeed().sampleGenerator(),
    },
  })
  @Public()
  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto): Promise<TeacherEntity> {
    return this.teacherService.create(createTeacherDto);
  }

  @ApiOperation({
    summary: 'Listar os professores da plataforma',
    description: 'Lista os professores da plataforma e suas informações',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Professores encontrados com sucesso',
    schema: {
      example: new TeacherSeed().sampleGenerator(),
    },
  })
  @Get()
  findAll(
    @Query() params: ListTeacherParamsDto,
  ): Promise<FindAllResponseDto<Array<TeacherEntity>>> {
    return this.teacherService.findAll(params);
  }

  @ApiOperation({
    summary: 'Buscar um professor',
    description: 'Busca um professor pelo seu ID e exibe suas informações',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Professor encontrado com sucesso',
    schema: {
      example: new TeacherSeed().sampleGenerator(),
    },
  })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<TeacherEntity> {
    return this.teacherService.findOne(id);
  }

  @ApiOperation({
    summary: 'Atualizar os dados de um professor',
    description: 'Atualiza os dados de um professor pelo seu ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Professor atualizado com sucesso',
  })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ): Promise<TeacherEntity> {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @ApiOperation({
    summary: 'Remove um professor',
    description: 'Remove um professor pelo seu ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Professor removido com sucesso',
  })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<TeacherEntity> {
    return this.teacherService.remove(id);
  }
}
