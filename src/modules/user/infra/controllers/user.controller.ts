import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
} from '@nestjs/common';

import { ListUserParamsDto } from '../../domain/dtos/list-user-params.dto';
import { CreateUserDto } from '../../domain/dtos/create-user.dto';
import { UpdateUserDto } from '../../domain/dtos/update-user.dto';
import { FindAllResponseDto } from 'src/shared/dtos/find-all-response.dto';

import { UserService } from '../../services/user.service';

import UserEntity from '../../domain/entities/user.entity';

import { Public } from 'src/shared/decorators/public.decorator';
import { UserSeed } from 'prisma/seed/implementations/user';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Criar uma conta de usuário',
    description: 'Cria uma conta de usuário',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'O usuário foi criado com sucesso',
    schema: {
      example: new UserSeed().sampleGenerator(),
    },
  })
  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Listar os usuários da plataforma',
    description: 'Lista os usuários da plataforma e suas informações',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuários encontrados com sucesso',
    schema: {
      example: new UserSeed().sampleGenerator(),
    },
  })
  @Get()
  findAll(
    @Query() params: ListUserParamsDto,
  ): Promise<FindAllResponseDto<Array<UserEntity>>> {
    return this.userService.findAll(params);
  }

  @ApiOperation({
    summary: 'Buscar um usuário',
    description: 'Busca um usuário pelo seu ID e exibe suas informações',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário encontrado com sucesso',
    schema: {
      example: new UserSeed().sampleGenerator(),
    },
  })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @ApiOperation({
    summary: 'Atualizar um usuário',
    description: 'Atualiza um usuário pelo seu ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário atualizado com sucesso',
  })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Remove um usuário',
    description: 'Remove um usuário pelo seu ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário removido com sucesso',
  })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.remove(id);
  }
}
