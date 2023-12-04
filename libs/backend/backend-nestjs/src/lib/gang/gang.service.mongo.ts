import { Gang, Identity, IdentityRole } from "@cswf-abiyikli-23/shared/api";
import { MongooseConnection } from "../mongooseConnection/mongooseConnection";
import { Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { IGangService } from "./igang.service";

@Injectable()
export class GangServiceMongo implements IGangService
{
    TAG: string = "GangerviceMongo";

    conn: MongooseConnection | null = null;

    constructor(conn: MongooseConnection)
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

    async create(gang: Gang): Promise<Gang> 
    {
        const gangNew = new this.conn!.schemas!.modelGang!({
            ...gang,
        })

        await gangNew.save();
        return gangNew;
    }

    async update(id: string, gang: Gang, identity: Identity): Promise<Gang> {

        Logger.log('update', this.TAG);

        const gangToUpdate = await this.get(id);

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
    }
}