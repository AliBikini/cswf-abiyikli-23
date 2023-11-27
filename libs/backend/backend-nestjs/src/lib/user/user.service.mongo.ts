import { IUserService } from "./iuser.service";
import { Gender, MotorcycleBody, MotorcycleFuel, User, UserRole } from "@cswf-abiyikli-23/shared/api";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { MongoClient } from "mongodb";
import { Observable } from "rxjs";
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchemaTemplate as UserModel, UserDocument, UserSchema } from './user.schema';


@Injectable()
export class UserServiceMongo implements IUserService
{
    TAG = 'UserServiceMongo';

    constructor(@InjectModel(UserModel.name) private userModel: Model<UserDocument>)
    {
    }

    async getAll(): Promise<User[]> {
        console.log("pow");
        return await this.userModel.find({});
    }
    get(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    create(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    update(id: string, user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): void {
        throw new Error("Method not implemented.");
    }
}