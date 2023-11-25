import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MotorcycleController } from './motorcycle/motorcycle.controller';

@Module({
  controllers: [UserController, MotorcycleController],
  providers: [UserService],
  exports: [UserService],
})
export class BackendNestjsModule {}
