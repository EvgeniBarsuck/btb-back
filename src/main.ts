import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from '@app/app.module';
import { swaggerConfig } from '@app/config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT']
  });

  const { tag, title, version } = swaggerConfig;
  const config = new DocumentBuilder()
    .setTitle(title)
    .setVersion(version)
    .addTag(tag)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
