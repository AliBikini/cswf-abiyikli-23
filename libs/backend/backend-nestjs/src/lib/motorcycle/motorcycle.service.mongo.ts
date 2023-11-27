import { Motorcycle } from "@cswf-abiyikli-23/shared/api";
import { IMotorcycleService } from "./imotorcycle.service";
import { MongoClient } from "mongodb";

export class MotorcycleServiceMongo implements IMotorcycleService
{
    TAG: string = "MotorcycleServiceMongo";

    mongoClient: MongoClient | null = null;
    connString: string = 'mongodb+srv://AliBikini:<password>@cluster0.z7gyl.mongodb.net/';

    constructor()
    {
        this.mongoClient = new MongoClient(this.connString)
    }

    getAll(): Motorcycle[] {
        throw new Error("Method not implemented.");
    }
    get(id: string): Motorcycle {
        throw new Error("Method not implemented.");
    }
    create(motorcycle: Motorcycle): Motorcycle {
        throw new Error("Method not implemented.");
    }
    update(id: string, motorcycle: Motorcycle): Motorcycle {
        throw new Error("Method not implemented.");
    }
    delete(id: string): void {
        throw new Error("Method not implemented.");
    }
}