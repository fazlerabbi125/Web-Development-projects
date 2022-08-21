import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import {useContainer} from "class-validator";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });//for custom validator

  await app.listen(parseInt(process.env.APP_PORT, 10)||8000);
}
bootstrap();
