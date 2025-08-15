import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // allow your frontend
    credentials: true, // if you use cookies
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
