import { Motorcycle } from "@cswf-abiyikli-23/shared/api";
import { IMotorcycleService } from "./imotorcycle.service";
import { MongooseConnection } from "../mongooseConnection/mongooseConnection";
import { Inject, Injectable, Logger, forwardRef } from "@nestjs/common";
import { RecoService } from "../reco/reco.service";

@Injectable()
export class MotorcycleServiceMongo implements IMotorcycleService
{
    TAG: string = "MotorcycleServiceMongo";

    conn: MongooseConnection | null = null;

    constructor(conn: MongooseConnection, @Inject(forwardRef(() => RecoService))private recoService: RecoService)
    {
        this.conn = conn;
    }

    async getAll(): Promise<Motorcycle[]> {
        Logger.log('getAll', this.TAG);
        const result = await this.conn?.schemas?.modelMotorcycle!.find().exec();
        Logger.log(result, this.TAG);
        return result as unknown as Motorcycle[];
    }

    async get(id: string): Promise<Motorcycle> {
        Logger.log('get', this.TAG);
        const result = await this.conn?.schemas?.modelMotorcycle!.findOne({ _id : id }).exec();
        Logger.log(result, this.TAG);
        return result as Motorcycle;
    }

    async create(motorcycle: Motorcycle): Promise<Motorcycle> 
    {
        const motorcycleNew = new this.conn!.schemas!.modelMotorcycle!({
            ...motorcycle,
        })

        await motorcycleNew.save();
        await this.recoService.motorcycleCreateOrUpdate(motorcycleNew);
        return motorcycleNew;
    }

    async update(id: string, motorcycle: Motorcycle): Promise<Motorcycle> {
        Logger.log('update', this.TAG);
        await this.conn?.schemas?.modelMotorcycle!.updateOne({ _id : id }, { ...motorcycle }).exec();

        const motorcycleUpdated = await this.get(id)
        await this.recoService.motorcycleCreateOrUpdate(motorcycleUpdated);
        
        return await this.get(id);
    }

    async delete(id: string): Promise<void> {
        await this.conn?.schemas?.modelMotorcycle!.deleteOne({ _id : id }).exec();
    }
}