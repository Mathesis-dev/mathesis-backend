import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from './modules/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors({
    credentials: true,
    optionsSuccessStatus: HttpStatus.OK,
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe());

  configService.configureSwagger(app);

  const serverPort = Number(process.env.SERVER_PORT) || 3000;

  await app.listen(serverPort, '0.0.0.0', () => {
    Logger.log(`Server running on port ${serverPort}`, 'Bootstrap');
  });
}
bootstrap();
