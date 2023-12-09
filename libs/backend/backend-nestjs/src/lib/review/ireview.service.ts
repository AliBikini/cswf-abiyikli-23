import { Review, User } from "@cswf-abiyikli-23/shared/api";
import { Id } from "libs/shared/api/src/lib/models/id.type";

export interface IReviewService
{
    TAG: string;

    getAllByMotorcycle(motorcycle_id: string): Promise<Review[]>
    getAll(): Promise<Review[]>
    get(id: Id): Promise<Review>
    create(motorcycle_id: string, review: Review, user_id: string): Promise<Review>
    //// Reviews should not be able to be changed after placing them I think
    //update(id: Id, review: Review): Promise<Review>
    delete(id: Id, user: User): Promise<void>;
}

export const IReviewService = Symbol("IReviewService");