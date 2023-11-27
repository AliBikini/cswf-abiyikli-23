import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
//import { v4 as uuid } from 'uuid';
import { Id } from "libs/shared/api/src/lib/models/id.type";
//import isEmail from 'validator/lib/isEmail';

export type UserDocument = UserSchemaTemplate & Document;

@Schema()
export class UserSchemaTemplate {
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
  email!: string[];

  @Prop({
    required: true,
    unique: true
  })
  dateBirth!: string[];

  @Prop({
    required: true,
    unique: true
  })
  userRole!: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaTemplate);
