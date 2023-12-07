import { Gang, Identity, IdentityRole } from "@cswf-abiyikli-23/shared/api";
import { MongooseConnection } from "../mongooseConnection/mongooseConnection";
import { ConflictException, Inject, Injectable, Logger, NotFoundException, UnauthorizedException, forwardRef } from "@nestjs/common";
import { IGangService } from "./igang.service";
import { RecoService } from "../reco/reco.service";
import { IUserService } from "../user/iuser.service";

@Injectable()
export class GangServiceMongo implements IGangService
{
    TAG: string = "GangerviceMongo";

    conn: MongooseConnection | null = null;

    constructor(conn: MongooseConnection, @Inject(IUserService)private userService: IUserService, @Inject(forwardRef(() => RecoService))private recoService: RecoService)
    {
        this.conn = conn;
    }

    async getAll(): Promise<Gang[]> {
        Logger.log('getAll', this.TAG);
        const gangs = await this.conn?.schemas?.modelGang!.find().exec();
        return gangs as unknown as Gang[];
    }

    async get(id: string): Promise<Gang> {
        Logger.log('get', this.TAG);
        const gang = await this.conn?.schemas?.modelGang!.findOne({ _id : id }).exec();
        return gang as Gang;
    }

    async create(gang: Gang, identity: Identity): Promise<Gang> 
    {
        const userOwner = await this.userService.get(gang.userOwner_id);

        if (!userOwner)
        {
            throw new NotFoundException("User to be owner of gang doesn't exist");
        }

        const gangNew = new this.conn!.schemas!.modelGang!({
            ...gang,
        })

        try
        {
            await gangNew.save();
            userOwner.gangsJoined.push(gangNew);
            await this.userService.update(gang.userOwner_id, userOwner, identity);
        }
        catch(error: any)
        {
            throw new ConflictException(error._message, error.message);
        }

        await this.recoService.gangCreateOrUpdate(gangNew, userOwner);
        return gangNew;
    }

    async update(id: string, gang: Gang, identity: Identity): Promise<Gang> {

        Logger.log('update', this.TAG);

        const gangToUpdate = await this.conn?.schemas.modelGang?.findOne({_id: gang._id}).exec();

        if (!gangToUpdate)
        {
            throw new NotFoundException(`Gang with id ${id} not found`);
        }

        if (identity.role != IdentityRole.admin)
        {
            if (identity.user_id != gangToUpdate.userOwner_id)
            {
                throw new UnauthorizedException("You are not the owner of this gang");
            }
        }

        try
        {
            await this.conn?.schemas.modelGang?.updateOne({_id: gang._id}, gang, { runValidators: true }).exec();
        }
        catch(error: any)
        {
            throw new ConflictException(error._message, error.message);
        }

        await this.conn?.schemas?.modelGang!.updateOne({ _id : id }, { ...gang }).exec();
        return await this.get(id);
    }

    async delete(id: string, identity: Identity): Promise<void> {
        Logger.log('delete', this.TAG);

        const gangToDelete = await this.get(id);

        if (!gangToDelete)
        {
            throw new NotFoundException(`Gang with id ${id} not found`);
        }

        if (identity.role != IdentityRole.admin)
        {
            if (identity.user_id != gangToDelete.userOwner_id)
            {
                throw new UnauthorizedException("You are not the owner of this gang");
            }
        }

        await this.conn?.schemas?.modelGang!.deleteOne({ _id : id }).exec();
        const gang = await this.get(id);
        await this.recoService.deleteNodeWithMongoId(id, "Gang");
    }

    async deleteAll(identity: Identity): Promise<void> {
        Logger.log('deleteAll', this.TAG);

        if (identity.role != IdentityRole.admin)
        {
            throw new UnauthorizedException();
        }

        await this.conn?.schemas?.modelGang!.deleteMany({}).exec();
        await this.recoService.deleteNodesWithLabel("Gang");
    }
}