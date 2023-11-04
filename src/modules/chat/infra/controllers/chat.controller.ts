import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ChatService } from '../../services/chat.service';

@ApiBearerAuth()
@ApiTags('AI Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiOperation({
    summary: 'Enviar mensagem para a Mathesis IA',
    description: 'Envia mensagem para o bot da Mathesis IA',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Post()
  sendMessage(@Body() body: { message: string }): Promise<string> {
    return this.chatService.sendMessage(body);
  }
}
