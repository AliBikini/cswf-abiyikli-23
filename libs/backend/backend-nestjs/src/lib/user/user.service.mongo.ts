import { IUserService } from "./iuser.service";
import { Identity, User } from "@cswf-abiyikli-23/shared/api";
import { ConflictException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { MongooseConnection } from "../mongooseConnection/mongooseConnection";
import { RecoService } from "../reco/reco.service";

@Injectable()
export class UserServiceMongo implements IUserService
{
    TAG = 'UserServiceMongo';

    constructor(private conn: MongooseConnection, private recoService: RecoService)
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
        Logger.debug(user, this.TAG);

        const userNew = new this.conn.schemas.modelUser!({
            email: user.email,
            nameFirst: user.nameFirst,
            nameLast: user.nameLast,
            dateBirth: user.dateBirth,
            gender: user.gender,
            motorcyclesOwned: user.motorcyclesOwned,
            reviewsPlaced: user.reviewsPlaced,
            gangsJoined: user.gangsJoined
        })

        try
        {
            await userNew.save();
        }
        catch(error:any)
        {
            throw new ConflictException(error._message, error.message);
        }

        await this.recoService.userCreateOrUpdate(userNew)
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

        const userToUpdate = await this.conn.schemas.modelUser!.findOne({ _id : id }).exec();

        if (!userToUpdate)
        {
            throw new ConflictException("User to update not found with id " + id);
        }

        userToUpdate!.nameFirst = user.nameFirst;
        userToUpdate!.nameLast = user.nameLast;
        userToUpdate!.email = user.email;
        userToUpdate!.dateBirth = user.dateBirth;
        userToUpdate!.gender = user.gender;
        userToUpdate!.motorcyclesOwned = user.motorcyclesOwned;
        userToUpdate!.reviewsPlaced = user.reviewsPlaced;
        userToUpdate!.gangsJoined = user.gangsJoined;

        try
        {
            await userToUpdate!.save();
        }
        catch(error:any)
        {
            throw new ConflictException(error._message, error.message);
        }

        const userUpdated = await this.get(id);
        await this.recoService.userCreateOrUpdate(userUpdated)
        
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