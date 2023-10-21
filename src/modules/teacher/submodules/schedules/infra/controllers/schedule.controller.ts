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

import { ScheduleSeed } from 'prisma/seed/implementations/schedule';

import { CreateScheduleDto } from '../../domain/dtos/create-schedule.dto';
import { ListScheduleParamsDto } from '../../domain/dtos/list-schedule-params.dto';
import { UpdateScheduleDto } from '../../domain/dtos/update-schedule.dto';

import ScheduleEntity from '../../domain/entities/schedule.entity';

import { ScheduleService } from '../../services/schedule.service';

@ApiBearerAuth()
@ApiTags('Schedules')
@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @ApiOperation({
    summary: 'Cadastrar um cronograma de aula',
    description: 'Cadastra um cronograma de aula',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'O cronograma de aula foi cadastrado com sucesso',
    schema: {
      example: new ScheduleSeed().sampleGenerator(),
    },
  })
  @Post()
  create(
    @Body() createScheduleDto: CreateScheduleDto,
  ): Promise<ScheduleEntity> {
    return this.scheduleService.create(createScheduleDto);
  }

  @ApiOperation({
    summary: 'Listar os cronogramas de aula do professor',
    description: 'Lista os cronogramas de aula de um professor',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cronogramas encontrados com sucesso',
    schema: {
      example: {
        data: [new ScheduleSeed().sampleGenerator()],
        total: 1,
        pages: 0,
      },
    },
  })
  @Get('/teacher/:id')
  findAllByTeacherId(
    @Query() params: ListScheduleParamsDto,
    @Param('id') id: number,
  ): Promise<FindAllResponseDto<Array<ScheduleEntity>>> {
    return this.scheduleService.findAllByTeacherId(params, id);
  }

  @ApiOperation({
    summary: 'Buscar um cronograma de aula',
    description:
      'Busca um cronograma de aula pelo seu ID e exibe suas informações',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cronograma de aula encontrado com sucesso',
    schema: {
      example: new ScheduleSeed().sampleGenerator(),
    },
  })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<ScheduleEntity> {
    return this.scheduleService.findOne(id);
  }

  @ApiOperation({
    summary: 'Atualizar os dados de um cromograma de aula',
    description: 'Atualiza os dados de um cronograma de aula pelo seu ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cronograma atualizado com sucesso',
    schema: {
      example: new ScheduleSeed().sampleGenerator(),
    },
  })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ): Promise<ScheduleEntity> {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @ApiOperation({
    summary: 'Remover um cronograma de aula',
    description: 'Remove um cronograma de aula pelo seu ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cronograma de aula removido com sucesso',
    schema: {
      example: new ScheduleSeed().sampleGenerator(new Date()),
    },
  })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<ScheduleEntity> {
    return this.scheduleService.remove(id);
  }
}
