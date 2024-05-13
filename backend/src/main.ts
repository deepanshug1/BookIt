import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import CookieSession from 'cookie-session';
import { AppModule } from './app.module';
const CookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.use(
    CookieSession({
      keys: ['digi'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
