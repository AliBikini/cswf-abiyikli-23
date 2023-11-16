import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendNestjsModule } from '@cswf-abiyikli-23/backend/backend-nestjs';

@Module({
  imports: [BackendNestjsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
