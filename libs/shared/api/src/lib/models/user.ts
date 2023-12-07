import { Gang } from "./gang";
import { Id } from "./id.type";
import { IdentityRole } from "./identity";
import { Motorcycle } from "./motorcycle";
import { Review } from "./review";

export enum Gender 
{
    male = 'Male',
    female = 'Female',
    other = 'Other',
}

export type TUser =
{
    _id: Id;
    nameFirst: string;
    nameLast: string;
    email: string;
    dateBirth: Date;
    gender: Gender;
    motorcyclesOwned : Motorcycle[];
    reviewsPlaced: Review[];
    gangsJoined: Gang[];
    userRole: IdentityRole;
}

export type TUserCreate = Pick<
    TUser,
    'nameFirst' | 'nameLast' | 'email' | 'dateBirth' | 'gender' | 'motorcyclesOwned' | 'userRole' | 'reviewsPlaced' | 'gangsJoined'
    >;
export type TUserUpdate = Partial<Omit<TUser, 'id'>>;
export type TUserUpsert = TUser;

export class User implements TUser
{
    _id: Id = "0";
    nameFirst: string = '';
    nameLast: string = '';
    email: string = '';
    dateBirth: Date = new Date();
    gender: Gender = Gender.other;
    motorcyclesOwned: Motorcycle[] = [];
    reviewsPlaced: Review[] = [];
    gangsJoined: Gang[] = [];
    userRole: IdentityRole = IdentityRole.user;
    
    constructor(_id = "", nameFirst = '', nameLast = '', email = '', dateBirth = new Date(), gender = Gender.other, motorcyclesOwned : Motorcycle[] = [], reviewsPlaced : Review[] = [], gangsJoined: Gang[] = [])
    {
        this._id = _id;
        this.nameFirst = nameFirst;
        this.nameLast = nameLast;
        this.email = email;
        this.dateBirth = dateBirth;
        this.gender = gender;
        this.motorcyclesOwned = motorcyclesOwned;
        this.reviewsPlaced = reviewsPlaced;
        this.gangsJoined = gangsJoined;
    }
}