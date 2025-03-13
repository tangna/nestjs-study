import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, ValidationPipe, VersioningType } from '@nestjs/common';
import { MyLogger } from './logger/my-logger.service';
import * as compression from 'compression';
import * as session from 'express-session';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: process.env.APP_NAME,
      // json: true,
      logLevels: ['log'],
    }),
  });
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useLogger(new MyLogger());
  // app.use(compression());
  app.use(
    session({ secret: 'my-secret', resave: false, saveUninitialized: false }),
  );
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME ?? 'nestjs-study')
    .setDescription(`${process.env.APP_NAME ?? 'nestjs-study'} API description`)
    .setVersion('1.0')
    .addTag('apiTag')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
