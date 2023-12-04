import { IUserService } from "./iuser.service";
import { Identity, User } from "@cswf-abiyikli-23/shared/api";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { MongooseConnection } from "../mongooseConnection/mongooseConnection";

@Injectable()
export class UserServiceMongo implements IUserService
{
    TAG = 'UserServiceMongo';

    constructor(private conn: MongooseConnection)
    {
    }

    async getAll(): Promise<User[]> {
        Logger.log('getAll', this.TAG);
        const result = await this.conn.schemas.modelUser!.find().populate("motorcyclesOwned").exec();
        Logger.log(result, this.TAG);
        return result as unknown as User[];
    }

    async get(id: string): Promise<User> {
        Logger.log('get', this.TAG);
        const result = await this.conn.schemas.modelUser!.findOne({ _id : id }).populate("motorcyclesOwned").exec();
        Logger.log(result, this.TAG);
        return result as User;
    }

    async getByEmail(email: string): Promise<User> {
        Logger.log('get', this.TAG);
        const result = await this.conn.schemas.modelUser!.findOne({ email : email }).populate("motorcyclesOwned").exec();
        Logger.log(result, this.TAG);
        return result as User;
    }

    async create(user: User): Promise<User> 
    {
        const userNew = new this.conn.schemas.modelUser!({
            ...user
        })

        await userNew.save();
        return userNew;
    }

    async update(id: string, user: User, identity: Identity): Promise<User> {
        Logger.log('update', this.TAG);

        if (identity.role != "admin")
        {
            if (identity.user_id != id)
            {
                const errorMsg = `You're not this user`;
                throw new UnauthorizedException(errorMsg);
            }
        }

        await this.conn.schemas.modelUser!.updateOne({ _id : id }, { ...user }).exec();
        return await this.get(id);
    }
    
    async delete(id: string, identity: Identity): Promise<void> {
        Logger.log('delete', this.TAG);

        if (identity.role != "admin")
        {
            if (identity.user_id != id)
            {
                const errorMsg = `You're not this user`;
                throw new UnauthorizedException(errorMsg);
            }
        }
        await this.conn.schemas.modelUser!.deleteOne({ _id : id }).exec();
    }
}