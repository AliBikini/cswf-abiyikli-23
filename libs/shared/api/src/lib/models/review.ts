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
    _id: Id = "-1";
    user_id: Id;
    motorcycle: Motorcycle;
    judgement: ReviewJudgement;
    title: string = '';
    message: string = '';
    date: Date = new Date();
    
    constructor(_id = "", user_id: string, motorcycle : Motorcycle, judgement: ReviewJudgement, title = '', message = '', date = new Date())
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