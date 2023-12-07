import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { MotorcycleController } from './motorcycle/motorcycle.controller';
import { IUserService } from './user/iuser.service';
import { UserServiceMemory } from './user/user.service.memory';
import { UserServiceMongo } from './user/user.service.mongo';
import { IMotorcycleService } from './motorcycle/imotorcycle.service';
import { MotorcycleServiceMemory } from './motorcycle/motorcycle.service.memory';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { GangController } from './gang/gang.controller';
import { IGangService } from './gang/igang.service';
import { GangServiceMongo } from './gang/gang.service.mongo';
import { RecoService } from './reco/reco.service';
import { RecoController } from './reco/reco.controller';
import { Neo4jService } from 'nest-neo4j/dist';
import { Neo4jModule } from 'nest-neo4j/dist';
import { Neo4jConfig } from 'nest-neo4j/dist/interfaces/neo4j-config.interface';
import { environment } from '@cswf-abiyikli-23/shared/util-env';

@Module({
  controllers: [IdentityController, UserController, MotorcycleController, ReviewController, GangController, RecoController],
  providers: [
    { provide: IUserService, useClass: UserServiceMongo }, 
    { provide: IMotorcycleService, useClass: MotorcycleServiceMongo },
    { provide: IReviewService, useClass: ReviewServiceMongo },
    { provide: IGangService, useClass: GangServiceMongo },
    MongooseConnection,
    Schemas,
    IdentityService,
    RecoService
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
    }),
    Neo4jModule.forRootAsync({
      imports: [
      ],
      inject: [ ConfigService ],
      useFactory: (): Neo4jConfig => ({
        scheme: environment.neo4jScheme || 'neo4j',
        host: environment.neo4jUri || 'localhost',
        port: environment.neo4jPort || 7687,
        username: environment.neo4jUser || 'neo4j',
        password: environment.neo4jPassword || 'CokianmafiA98.',
        database: environment.neo4jDb || 'neo4j',
      })}),
  ],
  exports: [],
})
export class BackendNestjsModule {}
