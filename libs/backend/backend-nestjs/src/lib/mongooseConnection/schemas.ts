import { Motorcycle, User } from "@cswf-abiyikli-23/shared/api";
import { Injectable } from "@nestjs/common";
import mongoose from "mongoose";

@Injectable()
export class Schemas
{
    schemaUser: mongoose.Schema<User> | null = null;
    modelUser: mongoose.Model<User> | null = null;

    schemaMotorcycle: mongoose.Schema<Motorcycle> | null = null;
    modelMotorcycle: mongoose.Model<Motorcycle> | null = null;

    constructor()
    {
        this.schemaUser = new mongoose.Schema({
            nameFirst: String,
            nameLast: String,
            email: String,
            dateBirth: Date,
            gender: String,
            userRole: String,
            motorcyclesOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: "Motorcycle" }],
        })

        this.modelUser = mongoose.model<User>("User", this.schemaUser);

        this.schemaMotorcycle = new mongoose.Schema({
            nameModel: String,
            body: String,
            year: String,
            fuel: String,
            seatHeight: String,
            horsePower: String,
            topSpeed: String,
            linkImage: String
        })

        this.modelMotorcycle = mongoose.model<Motorcycle>("Motorcycle", this.schemaMotorcycle);
    }
}