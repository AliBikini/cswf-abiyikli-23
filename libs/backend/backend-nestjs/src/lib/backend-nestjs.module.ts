import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MotorcycleController } from './motorcycle/motorcycle.controller';
import { MotorcycleService } from './motorcycle/motorcycle.service';

@Module({
  controllers: [UserController, MotorcycleController],
  providers: [UserService, MotorcycleService],
  exports: [],
})
export class BackendNestjsModule {}
