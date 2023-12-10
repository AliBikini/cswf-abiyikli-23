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

    schemaGang: mongoose.Schema<Gang> | null = null;
    modelGang: mongoose.Model<Gang> | null = null;

    constructor()
    {
        this.createSchemas();
    }

    createSchemas()
    {
        this.schemaIdentity = new mongoose.Schema({
            email: {type: String, lowercase: true, unique: true, required: true, validate: [this.validateEmail, 'Please enter a valid email address']},
            password: {type: String, required: true, validate: [this.validPassword, 'Please enter a valid password']},
            role: {type: String, required: true},
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
        })

        this.modelIdentity = mongoose.model<Identity>("Identity", this.schemaIdentity);

        this.schemaReview = new mongoose.Schema({
            user_id: {type: String, required: true},
            motorcycle: { type: mongoose.Schema.Types.ObjectId, ref: "Motorcycle", required: true },
            judgement: {type: String, required: true},
            title: String,
            message: String,
            date: {type: Date, required: true},
        })

        this.schemaUser = new mongoose.Schema({
            nameFirst: {type: String, required: true},
            nameLast: {type: String, required: true},
            dateBirth: {type: Date, required: true},
            gender: {type: String, required: true},
            motorcyclesOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: "Motorcycle" }],
            reviewsPlaced: [this.schemaReview],
            gangsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gang" }]
        })

        this.modelUser = mongoose.model<User>("User", this.schemaUser);

        this.schemaMotorcycle = new mongoose.Schema({
            nameModel: {type: String, required: true},
            body: {type: String, required: true},
            year: String,
            fuel: String,
            seatHeight: Number,
            horsePower: Number,
            topSpeed: Number,
            linkImage: String
        })

        this.modelMotorcycle = mongoose.model<Motorcycle>("Motorcycle", this.schemaMotorcycle);

        this.schemaGang = new mongoose.Schema({
            userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            name: {type: String, required: true},
            description: String,
            dateCreated: {type: Date, required: true},
            linkEmblem: String
        })

        this.modelGang = mongoose.model<Gang>("Gang", this.schemaGang);
    }

    validateEmail(email: string)
    {
        const regexp = new RegExp(
            '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
          );

        return regexp.test(email)
    }

    validPassword(password: string) {
        const regexp = new RegExp('^[a-zA-Z]([a-zA-Z0-9]){2,14}');
        return regexp.test(password);
      }
}