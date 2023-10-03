import { INestApplication, Injectable, Logger } from '@nestjs/common';
import { Environment } from './config.constants';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class ConfigService {
  environment: Environment;
  isDevelopment: boolean;
  isProduction: boolean;

  constructor() {
    this.environment = this.getEnvironment();
    this.isDevelopment = this.environment === 'development';
    this.isProduction = this.environment === 'production';

    Logger[this.isProduction ? 'warn' : 'log'](
      `Selected Application Environment: ${this.environment}`,
      'Environment',
    );
  }

  getEnvironment(): Environment {
    switch (process.env.NODE_ENV) {
      case 'production':
        return 'production';
      default:
      case 'development':
        return 'development';
    }
  }

  configureSwagger(app: INestApplication): OpenAPIObject {
    const config = new DocumentBuilder()
      .setTitle('Mathesis')
      .setDescription('Mathesis API in Node.js.')
      .setVersion('0.0.1')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document);
    return document;
  }
}
