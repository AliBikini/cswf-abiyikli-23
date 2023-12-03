import { Id } from "./id.type";

export enum ReviewJudgement
{
    good = "Good",
    bad = "Bad"
}

export class Review
{
    _id: Id = "0";
    user_id: Id = '0';
    motorcycle_id: Id = '0';
    judgement: ReviewJudgement = ReviewJudgement.good;
    title: string = '';
    message: string = '';
    date: Date = new Date();
    
    constructor(_id = "", user_id = '', motorcycle_id = '', judgement = ReviewJudgement.good, title = '', message = '', date = new Date())
    {
        this._id = _id;
        this.user_id = user_id;
        this.motorcycle_id = motorcycle_id;
        this.judgement = judgement;
        this.title = title;
        this.message = message;
        this.date = date;
    }
}