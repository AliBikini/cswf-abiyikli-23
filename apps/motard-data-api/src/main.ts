/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ApiResponseInterceptor } from '@cswf-abiyikli-23/backend/dto';
import { environment } from '@cswf-abiyikli-23/shared/util-env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const corsOptions: CorsOptions = {};
  app.enableCors(corsOptions);

  app.useGlobalInterceptors(new ApiResponseInterceptor());

  console.log(JSON.stringify(environment));

  const dataApiUrl = environment.dataApiUrl || 'http://localhost';
  const port = environment.dataApiPort || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application(motard-data-api) is running on: ${dataApiUrl}, on port ${port}`
  );
}

bootstrap();
