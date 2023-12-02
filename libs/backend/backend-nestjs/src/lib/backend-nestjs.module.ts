import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { MotorcycleController } from './motorcycle/motorcycle.controller';
import { IUserService } from './user/iuser.service';
import { UserServiceMemory } from './user/user.service.memory';
import { UserServiceMongo } from './user/user.service.mongo';
import { IMotorcycleService } from './motorcycle/imotorcycle.service';
import { MotorcycleServiceMemory } from './motorcycle/motorcycle.service.memory';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserSchemaTemplate, UserSchema } from './user/user.schema';
import { MotorcycleServiceMongo } from './motorcycle/motorcycle.service.mongo';
import { MongooseConnection } from './mongooseConnection/mongooseConnection';
import { Schemas } from './mongooseConnection/schemas';

@Module({
  controllers: [UserController, MotorcycleController],
  providers: [
    { provide: IUserService, useClass: UserServiceMongo }, 
    { provide: IMotorcycleService, useClass: MotorcycleServiceMongo },
    MongooseConnection,
    Schemas
  ],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      //`mongodb+srv://${process.env['MONGO_USR']}:${process.env['MONGO_PWD']}@${process.env['MONGO_HOST']}/${process.env['MONGO_DATABASE']}?retryWrites=true&w=majority`
      `mongodb+srv://AliBikini:CokianmafiA98.@cluster0.z7gyl.mongodb.net/motard?retryWrites=true&w=majority`
    ),
    MongooseModule.forFeature([
      { name: UserSchemaTemplate.name, schema: UserSchema }
    ])
  ],
  exports: [],
})
export class BackendNestjsModule {}
