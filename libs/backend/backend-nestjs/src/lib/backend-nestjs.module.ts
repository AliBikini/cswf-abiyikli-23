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
import { IdentityController } from './identity/identity.controller';
import { IdentityService } from './identity/identity.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { IReviewService } from './review/ireview.service';
import { ReviewServiceMongo } from './review/review.service.mongo';
import { ReviewController } from './review/review.controller';

@Module({
  controllers: [IdentityController, UserController, MotorcycleController, ReviewController],
  providers: [
    { provide: IUserService, useClass: UserServiceMongo }, 
    { provide: IMotorcycleService, useClass: MotorcycleServiceMongo },
    { provide: IReviewService, useClass: ReviewServiceMongo },
    MongooseConnection,
    Schemas,
    IdentityService
  ],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      //`mongodb+srv://${process.env['MONGO_USR']}:${process.env['MONGO_PWD']}@${process.env['MONGO_HOST']}/${process.env['MONGO_DATABASE']}?retryWrites=true&w=majority`
      `mongodb+srv://AliBikini:CokianmafiA98.@cluster0.z7gyl.mongodb.net/motard?retryWrites=true&w=majority`
    ),
    MongooseModule.forFeature([
      { name: UserSchemaTemplate.name, schema: UserSchema }
    ]),
    JwtModule.register({
      secret: process.env['JWT_SECRET'] || 'secretstring',
      signOptions: {expiresIn: '12 days'}
    })
  ],
  exports: [],
})
export class BackendNestjsModule {}
