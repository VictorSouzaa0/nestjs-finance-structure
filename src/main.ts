import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Finance')
    .setDescription('The API finance description')
    .setVersion('1.0')
    .addTag('Finance')
    .build()
  
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app,documentFactory())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
