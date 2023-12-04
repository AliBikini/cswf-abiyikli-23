import { Identity, Review, User } from "@cswf-abiyikli-23/shared/api";
import { MongooseConnection } from "../mongooseConnection/mongooseConnection";
import { Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
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

    async getAllByMotorcycle(motorcycle_id: string): Promise<Review[]> {
        Logger.log('getAllByMotorcycle', this.TAG);

        const motorcycle = await this.conn?.schemas.modelMotorcycle!.findOne({ _id : motorcycle_id }).exec();

        if (!motorcycle)
        {
            const errorMsg = `Motorcycle not found with id ${motorcycle_id}`;
            Logger.error(errorMsg, this.TAG);
            throw new NotFoundException(errorMsg);
        }

        const reviewsAll = await this.getAll();
        const reviewsMotorcycle = [];

        for (let i = 0; i < reviewsAll.length; i++)
        {
            if (reviewsAll.at(i)?.motorcycle_id.toString() == motorcycle_id.toString())
            {
                reviewsMotorcycle.push(reviewsAll.at(i));
            }
        } 

        return reviewsMotorcycle as Review[];
    }

    async getAll(): Promise<Review[]> {
        Logger.log('getAll', this.TAG);
        const users = await this.conn?.schemas?.modelUser!.find().exec();

        const reviewsAll = [];

        for (let i = 0; i < users!.length; i++)
        {
            const reviewsPlaced = users![i].reviewsPlaced;

            for (let i2 = 0; i2 < reviewsPlaced!.length; i2++)
            {
                reviewsAll.push(reviewsPlaced[i2]);
            }
        } 

        Logger.log(reviewsAll, this.TAG);
        return reviewsAll as unknown as Review[];
    }

    async get(id: string): Promise<Review> {
        Logger.log('get', this.TAG);
        const reviewsAll = await this.getAll();

        for (let i = 0; i < reviewsAll!.length; i++)
        {
            if (reviewsAll[i]._id == id)
            {
                Logger.log(reviewsAll[i], this.TAG);
                return reviewsAll[i] as Review;
            }
        } 

        const errorMsg = `Review not found with id ${id}`;
        Logger.error(errorMsg, this.TAG);
        throw new NotFoundException(errorMsg);
    }

    async create(review: Review): Promise<Review> 
    {
        const motorcycle = await this.conn?.schemas.modelMotorcycle?.findOne({ _id : review.motorcycle_id }).exec();

        if (!motorcycle)
        {
            const errorMsg = `Motorcycle not found with id ${review.motorcycle_id}`;
            Logger.error(errorMsg, this.TAG);
            throw new NotFoundException(errorMsg);
        }

        const user = await this.conn?.schemas.modelUser?.findOne({ _id : review.user_id }).exec();

        if (!user)
        {
            const errorMsg = `User not found with id ${review.user_id}`;
            Logger.error(errorMsg, this.TAG);
            throw new NotFoundException(errorMsg);
        }

        const reviewNew = user.reviewsPlaced.push({
            ...review,
        })

        await user.save();
        return user.reviewsPlaced[reviewNew - 1];
    }

    // async update(id: string, review: Review): Promise<Review> {
    //     Logger.log('update', this.TAG);
    //     await this.conn?.schemas?.modelReview!.updateOne({ _id : id }, { ...motorcycle }).exec();
    //     return await this.get(id);
    // }

    async delete(id: string, identity: Identity): Promise<void> {
        Logger.log('delete', this.TAG);
        const reviewToDelete = await this.get(id);

        if (identity.role == "user")
        {
            if (identity.user_id != reviewToDelete.user_id)
            {
                throw new UnauthorizedException("You're not the user who placed this review");
            }
        }

        const users = await this.conn?.schemas?.modelUser!.find().exec();

        for (let i = 0; i < users!.length; i++)
        {
            const user = users!.at(i)!;
            const reviewsPlaced = user.reviewsPlaced;

            for (let i2 = 0; i2 < reviewsPlaced!.length; i2++)
            {
                const review = reviewsPlaced.at(i2)!;

                if (review._id.toString() == reviewToDelete._id.toString())
                {
                    user.reviewsPlaced.splice(i2, 1);
                    await user.save();
                    Logger.log('Deleted review', this.TAG);
                    return;
                }
            }
        } 
        
        const errorMsg = `Review not found with id ${id}`;
        Logger.error(errorMsg, this.TAG);
        throw new NotFoundException(errorMsg);
    }
}