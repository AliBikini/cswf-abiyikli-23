import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { MotorcycleController } from './motorcycle/motorcycle.controller';
import { IUserService } from './user/iuser.service';
import { UserServiceMemory } from './user/user.service.memory';
import { UserServiceMongo } from './user/user.service.mongo';
import { IMotorcycleService } from './motorcycle/imotorcycle.service';
import { MotorcycleServiceMemory } from './motorcycle/motorcycle.service.memory';
import { ConfigService } from '@nestjs/config';
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
    JwtModule.register({
      secret: environment.jwtSecret,
      signOptions: {expiresIn: '12 days'}
    }),
    Neo4jModule.forRootAsync({
      imports: [
      ],
      inject: [ ConfigService ],
      useFactory: (): Neo4jConfig => ({
        scheme: environment.neo4jScheme,
        host: environment.neo4jUri,
        port: environment.neo4jPort,
        username: environment.neo4jUser,
        password: environment.neo4jPassword,
        database: environment.neo4jDb,
      })}),
  ],
  exports: [],
})
export class BackendNestjsModule {}
