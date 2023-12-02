import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
//import { v4 as uuid } from 'uuid';
import { Id } from "libs/shared/api/src/lib/models/id.type";
import isEmail from 'validator/lib/isEmail';
import { IsMongoId } from 'class-validator';
import { Gender, IdentityRole } from '@cswf-abiyikli-23/shared/api';

export type UserDocument = UserSchemaTemplate & Document;

@Schema()
export class UserSchemaTemplate 
{
  @Prop({type: String})
  id!: Id;

  @Prop({
    required: true,
  })
  nameFirst!: string;

  @Prop({
    required: true,
  })
  nameLast!: string;

  @Prop({
    required: true,
    unique: true
  })
  email!: string;

  @Prop({
    required: true,
  })
  dateBirth!: Date;

  @Prop({
    required: true,
    type: String,
  })
  userRole!: IdentityRole;

  @Prop({
    required: true,
    type: String,
  })
  gender!: Gender;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaTemplate);
