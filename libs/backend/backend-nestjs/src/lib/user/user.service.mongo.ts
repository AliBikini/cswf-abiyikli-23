import { IUserService } from "./iuser.service";
import { User } from "@cswf-abiyikli-23/shared/api";
import { Injectable, Logger } from "@nestjs/common";
import { MongooseConnection } from "../mongooseConnection/mongooseConnection";

@Injectable()
export class UserServiceMongo implements IUserService
{
    TAG = 'UserServiceMongo';

    conn: MongooseConnection | null = null;

    constructor(conn: MongooseConnection)
    {
        this.conn = conn;
    }

    async getAll(): Promise<User[]> {
        Logger.log('getAll', this.TAG);
        const result = await this.conn?.schemas?.modelUser!.find().populate("motorcyclesOwned").exec();
        Logger.log(result, this.TAG);
        return result as unknown as User[];
    }

    async get(id: string): Promise<User> {
        Logger.log('get', this.TAG);
        const result = await this.conn?.schemas?.modelUser!.findOne({ _id : id }).populate("motorcyclesOwned").exec();
        Logger.log(result, this.TAG);
        return result as User;
    }

    async create(user: User): Promise<User> 
    {
        const userNew = new this.conn!.schemas!.modelUser!({
            ...user,
        })

        await userNew.save();
        return userNew;
    }

    async update(id: string, user: User): Promise<User> {
        Logger.log('update', this.TAG);
        await this.conn?.schemas?.modelUser!.updateOne({ _id : id }, { ...user }).exec();
        return await this.get(id);
    }
    
    async delete(id: string): Promise<void> {
        await this.conn?.schemas?.modelUser!.deleteOne({ _id : id }).exec();
    }
}