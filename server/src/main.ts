import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with options
  app.enableCors({
    origin: 'http://localhost:3000', // The frontend's origin
    credentials: true,
  });

  await app.listen(4000);
}
bootstrap();
