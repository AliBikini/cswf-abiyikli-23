import { Review } from "@cswf-abiyikli-23/shared/api";
import { MongooseConnection } from "../mongooseConnection/mongooseConnection";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { IReviewService } from "./ireview.service";

@Injectable()
export class ReviewServiceMongo implements IReviewService
{
    TAG: string = "ReviewServiceMongo";

    conn: MongooseConnection | null = null;

    constructor(conn: MongooseConnection)
    {
        this.conn = conn;
    }

    async getAll(): Promise<Review[]> {
        Logger.log('getAll', this.TAG);
        const result = await this.conn?.schemas?.modelReview!.find().exec();
        Logger.log(result, this.TAG);
        return result as unknown as Review[];
    }

    async get(id: string): Promise<Review> {
        Logger.log('get', this.TAG);
        const result = await this.conn?.schemas?.modelReview!.findOne({ _id : id }).exec();
        Logger.log(result, this.TAG);
        return result as Review;
    }

    async create(review: Review): Promise<Review> 
    {
        const motorcycle = await this.conn?.schemas.modelMotorcycle?.findOne({ _id : review.motorcycle_id }).exec();

        if (!motorcycle)
        {
            throw new NotFoundException();
        }

        const reviewNew = new this.conn!.schemas!.modelReview!({
            ...review,
        })

        await reviewNew.save();
        return reviewNew;
    }

    // async update(id: string, review: Review): Promise<Review> {
    //     Logger.log('update', this.TAG);
    //     await this.conn?.schemas?.modelReview!.updateOne({ _id : id }, { ...motorcycle }).exec();
    //     return await this.get(id);
    // }

    async delete(id: string): Promise<void> {
        await this.conn?.schemas?.modelReview!.deleteOne({ _id : id }).exec();
    }
}