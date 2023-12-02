import { environment } from "@cswf-abiyikli-23/shared/util-env";
import { Injectable, Logger } from "@nestjs/common";
import mongoose, { Model } from "mongoose";
import { Schemas } from "./schemas";

@Injectable()
export class MongooseConnection
{
    TAG: string = "MongooseConnection";

    connstring: string = environment.mongoConnString;
    db: mongoose.mongo.Db | null = null;

    constructor(public schemas: Schemas)
    {
        this.connectToDb();
    }

    async connectToDb()
    {
        await mongoose.connect(this.connstring);
        Logger.log("Mongo connection status: " + mongoose.connection.readyState, this.TAG);
        await mongoose.connect(this.connstring);
        this.db = mongoose.connection.db;
    }
}