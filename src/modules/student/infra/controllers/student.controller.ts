import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateStudentDto } from '../../domain/dtos/create-student.dto';
import { UpdateStudentDto } from '../../domain/dtos/update-student.dto';

import { StudentService } from '../../services/student.service';

import StudentEntity from '../../domain/entities/student.entity';

import { StudentSeed } from 'prisma/seed/implementations/student';

@ApiBearerAuth()
@ApiTags('Students')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({
    summary: 'Criar um estudante',
    description: 'Cria um estudante',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'O estudante foi criado com sucesso',
    schema: {
      example: new StudentSeed().sampleGenerator(),
    },
  })
  @Post()
  create(@Body() createStudentDto: CreateStudentDto): Promise<StudentEntity> {
    return this.studentService.create(createStudentDto);
  }

  @ApiOperation({
    summary: 'Buscar um estudante pelo seu ID',
    description: 'Busca um estudante pelo seu ID e exibe suas informações',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Estudante encontrado com sucesso',
    schema: {
      example: new StudentSeed().sampleGenerator(),
    },
  })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<StudentEntity> {
    return this.studentService.findOne(id);
  }

  @ApiOperation({
    summary: 'Atualizar um estudante pelo seu ID',
    description: 'Atualiza um estudante pelo seu ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Estudante atualizado com sucesso',
    schema: {
      example: new StudentSeed().sampleGenerator(),
    },
  })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<StudentEntity> {
    return this.studentService.update(id, updateStudentDto);
  }

  @ApiOperation({
    summary: 'Remove um estudante pelo seu ID',
    description: 'Remove um estudante pelo seu ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Estudante removido com sucesso',
    schema: {
      example: new StudentSeed().sampleGenerator(new Date()),
    },
  })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<StudentEntity> {
    return this.studentService.remove(id);
  }
}
