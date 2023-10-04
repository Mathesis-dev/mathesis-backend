import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { LocalAuthGuard } from '../../domain/guards/local-auth.guard';
import { AuthRequest } from '../../domain/interfaces/auth-request.interface';
import { AuthService } from '../../services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Loga o usuário na plataforma',
    description: 'Loga o usuário na plataforma',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'O usuário efetuou o login com sucesso',
    schema: {
      type: 'object',
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        expires_in: '2h',
        user: {
          id: 1,
          email: 'fulanodasilva@gmail.com',
        },
        properties: {
          access_token: {
            type: 'string',
          },
          expires_in: {
            type: 'string',
          },
          user: {
            type: 'object',
          },
        },
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
}