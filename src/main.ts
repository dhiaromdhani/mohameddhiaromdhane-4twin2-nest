// src/main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Active la validation globale pour tous les DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // supprime les propriétés non définies dans le DTO
      forbidNonWhitelisted: true, // renvoie une erreur si des propriétés inconnues sont envoyées
      transform: true, // convertit automatiquement les types (ex: id:string -> id:number)
    }),
  );

  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
}
bootstrap();
