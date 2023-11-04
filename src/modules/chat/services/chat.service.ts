import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ChatService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async sendMessage(body: { message: string }): Promise<string> {
    const message = body.message;

    try {
      const chatCompletion = await this.openai.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: 'gpt-3.5-turbo',
      });

      return chatCompletion.choices[0].message.content;
    } catch (error) {
      throw new Error(`Houve um erro ao enviar a mensagem: ${error}`);
    }
  }
}
