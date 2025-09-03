import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {

  const app = await NestFactory.create(AppModule)
 const config = new DocumentBuilder()
 .setTitle(`API de users`)
 .setDescription('Documentação da API de usuários com NestJS + Prisma + Swagger')
 .setVersion('1.0')
  .addTag('users') // Tag opcional para categorizar as rotas
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'authorization',
    in: 'header',
  })
  
  
  .build(); // construir a documentação

   const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); // Acessível em http://localhost:3000/api


    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Remova propriedades não decoradas no DTO
        forbidNonWhitelisted: true,/* Retorna erro se 
        enviar propriedades não permitidas*/
        transform: true /* Tranforma os tipos automaticamente 
        EX:(string -> number) */



      })
    )


    await app.listen(3001);
    
// const port = process.env.PORT || 3000;
// await app.listen(port);
// console.log(`🚀 Application is running on: http://localhost:${port}`);

}
bootstrap();
