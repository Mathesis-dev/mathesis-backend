import { BadRequestException, Injectable } from '@nestjs/common';

import { FindAllResponseDto } from 'src/shared/dtos/find-all-response.dto';

import { TeachingSchedules } from '@prisma/client';
import { CreateScheduleDto } from '../domain/dtos/create-schedule.dto';
import { ListScheduleParamsDto } from '../domain/dtos/list-schedule-params.dto';
import { UpdateScheduleDto } from '../domain/dtos/update-schedule.dto';
import ScheduleEntity from '../domain/entities/schedule.entity';
import { ScheduleRepository } from '../infra/repositories/schedule.repository';

@Injectable()
export class ScheduleService {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<ScheduleEntity> {
    const scheduleExists = await this.scheduleRepository.findOneBy({
      from: createScheduleDto.from,
      to: createScheduleDto.to,
      subject: createScheduleDto.subject,
    });

    if (scheduleExists) {
      throw new BadRequestException(
        'Aula/cronograma já está cadastrada na plataforma',
      );
    }

    return await this.scheduleRepository.create(createScheduleDto);
  }

  async findAllByTeacherId(
    params: ListScheduleParamsDto,
    id: number,
  ): Promise<FindAllResponseDto<Array<ScheduleEntity>>> {
    return await this.scheduleRepository.findAllByTeacherId(params, id);
  }

  async findOne(id: number): Promise<ScheduleEntity> {
    return await this.scheduleRepository.findOne(id);
  }

  async findOneBy(where: Partial<TeachingSchedules>): Promise<ScheduleEntity> {
    return await this.scheduleRepository.findOneBy(where);
  }

  async update(
    id: number,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<ScheduleEntity> {
    const scheduleExists = await this.scheduleRepository.findOneBy({
      id,
    });

    if (!scheduleExists) {
      throw new BadRequestException('Esse cronograma/aula não existe');
    }

    return await this.scheduleRepository.update(id, updateScheduleDto);
  }

  async remove(id: number): Promise<ScheduleEntity> {
    const scheduleExists = await this.scheduleRepository.findOneBy({
      id,
    });

    if (!scheduleExists) {
      throw new BadRequestException('Esse cronograma/aula não existe');
    }

    return await this.scheduleRepository.remove(id);
  }
}
