import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionsFilter } from './modules/core/filters/exceptions.filter';

const logger = new Logger();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionsFilter());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(process.env.APP_NAME)
    .setDescription(process.env.APP_NAME)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // handle larger requests
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // add security headers
  await app.listen(process.env.PORT, () => logger.log('App is listening'));
}
bootstrap();
