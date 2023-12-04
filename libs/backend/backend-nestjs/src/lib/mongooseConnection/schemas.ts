import { Gang, Identity, Motorcycle, Review, User } from "@cswf-abiyikli-23/shared/api";
import { Injectable } from "@nestjs/common";
import mongoose from "mongoose";

@Injectable()
export class Schemas
{
    schemaIdentity: mongoose.Schema<Identity> | null = null;
    modelIdentity: mongoose.Model<Identity> | null = null;

    schemaUser: mongoose.Schema<User> | null = null;
    modelUser: mongoose.Model<User> | null = null;

    schemaMotorcycle: mongoose.Schema<Motorcycle> | null = null;
    modelMotorcycle: mongoose.Model<Motorcycle> | null = null;

    schemaReview: mongoose.Schema<Review> | null = null;
    modelReview: mongoose.Model<Review> | null = null;

    schemaGang: mongoose.Schema<Gang> | null = null;
    modelGang: mongoose.Model<Gang> | null = null;

    constructor()
    {
        this.schemaIdentity = new mongoose.Schema({
            user_id: String,
            email: String,
            password: String,
            role: String,
        })

        this.modelIdentity = mongoose.model<Identity>("Identity", this.schemaIdentity);

        this.schemaReview = new mongoose.Schema({
            user_id: String,
            motorcycle_id: String,
            judgement: String,
            title: String,
            message: String,
            date: Date
        })

        this.modelReview = mongoose.model<Review>("Review", this.schemaReview);

        this.schemaUser = new mongoose.Schema({
            nameFirst: String,
            nameLast: String,
            email: String,
            dateBirth: Date,
            gender: String,
            motorcyclesOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: "Motorcycle" }],
            reviewsPlaced: [this.schemaReview]
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

        this.schemaGang = new mongoose.Schema({
            userOwner_id: String,
            name: String,
            description: String,
            dateCreated: Date,
            linkEmblem: String
        })

        this.modelGang = mongoose.model<Gang>("Gang", this.schemaGang);
    }
}