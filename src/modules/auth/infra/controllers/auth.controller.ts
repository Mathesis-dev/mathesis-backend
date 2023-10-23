import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { LocalAuthGuard } from '../../domain/guards/local-auth.guard';
import { AuthRequest } from '../../domain/interfaces/auth-request.interface';
import { AuthService } from '../../services/auth.service';
import UserEntity from 'src/modules/user/domain/entities/user.entity';
import { UserSeed } from 'prisma/seed/implementations/user';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Loga o usuário na plataforma',
    description: 'Loga o usuário na plataforma',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              email: 'fulano@gmail.com',
              password: 'Teste1@',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'O usuário efetuou o login com sucesso',
    schema: {
      type: 'object',
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      },
    },
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @ApiOperation({
    summary: 'Validar se o usuário ainda está autenticado',
    description: 'Valida se o usuário ainda está autenticado',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário validado com sucesso',
    schema: {
      example: new UserSeed().sampleGenerator(),
    },
  })
  @ApiBearerAuth()
  @Get()
  auth(@Req() request: Request): Promise<UserEntity> {
    const { user } = request as unknown as {
      user?: { id: number; email: string };
    };

    return this.authService.validateAuth(user);
  }
}
