import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Allow cookies or Authorization headers
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Enables transformation of input to DTO types
      whitelist: true, // Strips properties not defined in the DTO
      forbidNonWhitelisted: true, // Rejects properties not defined in the DTO
    }),
  );
  await app.listen(process.env.PORT ?? 3030);
}
bootstrap();
