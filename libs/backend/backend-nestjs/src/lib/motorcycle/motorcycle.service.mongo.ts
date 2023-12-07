import { Motorcycle } from "@cswf-abiyikli-23/shared/api";
import { IMotorcycleService } from "./imotorcycle.service";
import { MongooseConnection } from "../mongooseConnection/mongooseConnection";
import { ConflictException, Inject, Injectable, Logger, NotFoundException, forwardRef } from "@nestjs/common";
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

        try
        {
            await motorcycleNew.save();
        }
        catch(error:any)
        {
            throw new ConflictException(error._message, error.message);
        }

        await this.recoService.motorcycleCreateOrUpdate(motorcycleNew);
        return motorcycleNew;
    }

    async update(id: string, motorcycle: Motorcycle): Promise<Motorcycle> {
        Logger.log('update', this.TAG);

        const motorcycleToUpdate = await this.conn?.schemas?.modelMotorcycle!.findOne({ _id : id }).exec();

        if (!motorcycleToUpdate)
        {
            throw new NotFoundException("Could not find motorcycle to update with id " + id);
        }

        motorcycleToUpdate!.nameModel = motorcycle.nameModel;
        motorcycleToUpdate!.body = motorcycle.body;
        motorcycleToUpdate!.year = motorcycle.year;
        motorcycleToUpdate!.fuel = motorcycle.fuel;
        motorcycleToUpdate!.horsePower = motorcycle.horsePower;
        motorcycleToUpdate!.seatHeight = motorcycle.seatHeight;
        motorcycleToUpdate!.topSpeed = motorcycle.topSpeed;
        motorcycleToUpdate!.linkImage = motorcycle.linkImage;

        try
        {
            await motorcycleToUpdate.save();
        }
        catch(error:any)
        {
            throw new ConflictException(error._message, error.message);
        }

        await this.recoService.motorcycleCreateOrUpdate(motorcycleToUpdate);
        
        return await this.get(id);
    }

    async delete(id: string): Promise<void> {
        await this.conn?.schemas?.modelMotorcycle!.deleteOne({ _id : id }).exec();
    }
}