import { Review } from "@cswf-abiyikli-23/shared/api";
import { Id } from "libs/shared/api/src/lib/models/id.type";

export interface IReviewService
{
    TAG: string;

    getAll(): Promise<Review[]>
    get(id: Id): Promise<Review>
    create(review: Review): Promise<Review>
    //// Reviews should not be able to be changed after placing them I think
    //update(id: Id, review: Review): Promise<Review>
    delete(id: Id): void;
}

export const IReviewService = Symbol("IReviewService");