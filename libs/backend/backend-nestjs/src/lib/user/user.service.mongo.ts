import { IUserService } from "./iuser.service";
import { User, IdentityRole } from "@cswf-abiyikli-23/shared/api";
import { ConflictException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { MongooseConnection } from "../mongooseConnection/mongooseConnection";
import { RecoService } from "../reco/reco.service";

@Injectable()
export class UserServiceMongo implements IUserService
{
    TAG = 'UserServiceMongo';

    constructor(private conn: MongooseConnection, private recoService: RecoService)
    {}

    async getAll(): Promise<User[]> {
        Logger.log('getAll', this.TAG);
        const result = await this.conn.schemas.modelUser!.find().populate(["motorcyclesOwned", "gangsJoined"]).exec();
        //Logger.log(result, this.TAG);
        return result as unknown as User[];
    }

    async get(id: string): Promise<User> {
        Logger.log('get', this.TAG);
        const result = await this.conn.schemas.modelUser!.findOne({ _id : id }).populate(["motorcyclesOwned", "gangsJoined"]).exec();
        //Logger.log(result, this.TAG);
        return result as User;
    }

    async getByEmail(email: string): Promise<User> {
        Logger.log('get', this.TAG);
        const result = await this.conn.schemas.modelUser!.findOne({ email : email }).populate(["motorcyclesOwned", "gangsJoined"]).exec();
        //Logger.log(result, this.TAG);
        return result as User;
    }

    async create(user: User): Promise<User> 
    {
        Logger.debug(user, this.TAG);

        const userNew = new this.conn.schemas.modelUser!({
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
        return userNew.populate(["motorcyclesOwned", "gangsJoined"]);
    }

    async update(id: string, data: any, userRequestor_id: string, role: IdentityRole | null): Promise<User> {
        Logger.log('update', this.TAG);

        if (role != IdentityRole.admin)
        {
            if (userRequestor_id != id)
            {
                const errorMsg = `You're not this user`;
                throw new UnauthorizedException(errorMsg);
            }
        }

        let userToUpdate = await this.conn.schemas.modelUser!.findOne({ _id : id }).exec() as User;

        if (!userToUpdate)
        {
            throw new ConflictException("User to update not found with id " + id);
        }

        //Logger.debug(data, this.TAG);
        //userToUpdate = {...data};

        try
        {
            await this.conn.schemas.modelUser!.updateOne({ _id: id }, data, { runValidators: true }).exec();
        }
        catch(error: any)
        {
            throw new ConflictException(error._message, error.message);
        }

        const userUpdated = await this.get(id);
        await this.recoService.userCreateOrUpdate(userUpdated)
        
        return await this.get(id);
    }
    
    async delete(id: string, userRequestor_id: string, role: IdentityRole | null): Promise<void> {
        Logger.log('delete', this.TAG);

        if (role != IdentityRole.admin)
        {
            if (userRequestor_id != id)
            {
                const errorMsg = `You're not this user`;
                throw new UnauthorizedException(errorMsg);
            }
        }
        await this.conn.schemas.modelUser!.deleteOne({ _id : id }).exec();
        await this.recoService.deleteNodeWithMongoId(id, "User");
    }
}