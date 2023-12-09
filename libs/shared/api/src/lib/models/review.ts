import { Id } from "./id.type";
import { Motorcycle } from "./motorcycle";
import { User } from "./user";

export type TReviewCreate =
{
    user_id: Id;
    motorcycle: Motorcycle;
    date: Date;
    judgement: ReviewJudgement;
    title: string | null;
    message: string | null;
}

export enum ReviewJudgement
{
    positive = "Positive",
    negative = "Negative"
}

export class Review
{
    _id: Id = "0";
    user_id: Id = '0';
    motorcycle: Motorcycle | null = null;
    judgement: ReviewJudgement = ReviewJudgement.positive;
    title: string = '';
    message: string = '';
    date: Date = new Date();
    
    constructor(_id = "", user_id = '', motorcycle = null, judgement = ReviewJudgement.positive, title = '', message = '', date = new Date())
    {
        this._id = _id;
        this.user_id = user_id;
        this.motorcycle = motorcycle;
        this.judgement = judgement;
        this.title = title;
        this.message = message;
        this.date = date;
    }
}