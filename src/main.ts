import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1"); // lo que va a estar fijo en la url

  app.useGlobalPipes(
    new ValidationPipe({ // configurando que de forma global haga las validaciones de entrada...
      whitelist: true,
      forbidNonWhitelisted: true, // este le tira un error al cliente si me manda algo que no esta bien
      transform: true, // que trasnforme, cuando pueda, los datos.., el que hace la magia, para que no tenga que parsear algunos parametros
    })
  );
  app.enableCors()
  await app.listen(parseInt(process.env.PORT)||3000);
}

bootstrap();
