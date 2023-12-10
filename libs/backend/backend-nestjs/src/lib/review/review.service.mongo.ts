import { Identity, Review, User } from "@cswf-abiyikli-23/shared/api";
import { MongooseConnection } from "../mongooseConnection/mongooseConnection";
import { ConflictException, Injectable, Inject, Logger, NotFoundException, UnauthorizedException, forwardRef } from "@nestjs/common";
import { IReviewService } from "./ireview.service";
import { RecoService } from "../reco/reco.service";
import { IdentityRole } from "libs/shared/api/src/lib/models/enums";
import { Id } from "libs/shared/api/src/lib/models/id.type";

@Injectable()
export class ReviewServiceMongo implements IReviewService
{
    TAG: string = "ReviewServiceMongo";

    conn: MongooseConnection | null = null;

    constructor(conn: MongooseConnection, @Inject(forwardRef(() => RecoService))private recoService: RecoService)
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
            if (reviewsAll.at(i)?.motorcycle?._id.toString() == motorcycle_id.toString())
            {
                reviewsMotorcycle.push(reviewsAll.at(i));
            }
        } 

        return reviewsMotorcycle as Review[];
    }

    async getAll(): Promise<Review[]> {
        Logger.log('getAll', this.TAG);
        const users = await this.conn?.schemas?.modelUser!.find().populate('reviewsPlaced.motorcycle').exec();

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

    async create(motorcycle_id: string, review: Review, user_id: string): Promise<Review> 
    {
        const motorcycle = await this.conn?.schemas.modelMotorcycle?.findOne({ _id : motorcycle_id }).exec();

        if (!motorcycle)
        {
            const errorMsg = `Motorcycle not found with id ${motorcycle_id}`;
            Logger.error(errorMsg, this.TAG);
            throw new NotFoundException(errorMsg);
        }

        const user = await this.conn?.schemas.modelUser?.findOne({ _id : user_id }).exec();

        if (!user)
        {
            const errorMsg = `User not found with id ${user_id}`;
            Logger.error(errorMsg, this.TAG);
            throw new NotFoundException(errorMsg);
        }

        review.user_id = user._id;
        review.motorcycle = motorcycle;

        const reviewNewIndex = user.reviewsPlaced.push({
            ...review
        })

        const reviewAdded = user.reviewsPlaced[reviewNewIndex - 1];

        try
        {
            await user.save();
        }
        catch(error: any)
        {
            throw new ConflictException(error._message, error.message);
        }

        await this.recoService.reviewCreateOrUpdate(reviewAdded);
        return reviewAdded;
    }

    // async update(id: string, review: Review): Promise<Review> {
    //     Logger.log('update', this.TAG);
    //     await this.conn?.schemas?.modelReview!.updateOne({ _id : id }, { ...motorcycle }).exec();
    //     return await this.get(id);
    // }

    async delete(id: string, user_id: Id, role: IdentityRole | null): Promise<Review> {
        Logger.log('delete', this.TAG);
        const reviewToDelete = await this.get(id);

        if (role != IdentityRole.admin)
        {
            if (user_id != reviewToDelete.user_id)
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
                    const reviewsDeleted: Review[] = user.reviewsPlaced.splice(i2, 1);
                    
                    try
                    {
                        await user.save();
                    }
                    catch(error: any)
                    {
                        throw new ConflictException(error._message, error.message);
                    }

                    await this.recoService.deleteRelationWithMongoId(id);
                    Logger.log('Deleted review', this.TAG);
                    return reviewsDeleted[0];
                }
            }
        } 
        
        const errorMsg = `Review not found with id ${id}`;
        Logger.error(errorMsg, this.TAG);
        throw new NotFoundException(errorMsg);
    }
}