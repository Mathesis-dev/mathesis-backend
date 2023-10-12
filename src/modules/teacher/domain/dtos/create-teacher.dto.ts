import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

// TODO - Adicionar schedules
export class CreateTeacherDto {
  @ApiProperty({
    description: 'Whatsapp do professor',
    example: '+55 (48) 99966-6173',
  })
  @IsString({ message: 'Telefone inválido' })
  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  @IsPhoneNumber('BR', { message: 'Telefone inválido' }) // TODO - Validar
  phone: string;

  @ApiProperty({
    description: 'Biografia do professor',
    example:
      'Trabalho há 10 anos dando aulas de matemática. Já trabalhei nas universidades X e Y. Sou formado em engenharia.',
  })
  @IsString({ message: 'Biografia em formato inválido' })
  @IsNotEmpty({ message: 'Biografia é obrigatória' })
  biography: string;

  @ApiProperty({
    description: 'ID do usuário',
    example: 1,
  })
  @IsNumber({ allowNaN: false }, { message: 'ID do usuário inválido' })
  @IsNotEmpty({ message: 'ID do usuário é obrigatório' })
  userId: number;

  @ApiProperty({
    description: 'Cidade do professor',
    example: 'Tubarão',
  })
  @IsString({ message: 'Cidade em formato inválido' })
  @IsNotEmpty({ message: 'Cidade é obrigatória' })
  city: string;

  @ApiProperty({
    description: 'Estado do professor',
    example: 'Santa Catarina',
  })
  @IsString({ message: 'Estado em formato inválido' })
  @IsNotEmpty({ message: 'Estado é obrigatório' })
  state: string;
}
