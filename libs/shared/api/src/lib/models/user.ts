import { IdentityRole, Gender } from "./enums";
import { Gang } from "./gang";
import { Id } from "./id.type";
import { Motorcycle } from "./motorcycle";
import { Review } from "./review";

export type TUser =
{
    _id: Id;
    nameFirst: string;
    nameLast: string;
    dateBirth: Date;
    gender: Gender;
    motorcyclesOwned : Motorcycle[];
    reviewsPlaced: Review[];
    gangsJoined: Gang[];
    role: IdentityRole | null;
}

export type TUserCreate = Pick<
    TUser,
    'nameFirst' | 'nameLast' | 'dateBirth' | 'gender' | 'motorcyclesOwned' | 'reviewsPlaced' | 'gangsJoined'
    >;
export type TUserUpdate = Partial<Omit<TUser, 'id'>>;
export type TUserUpsert = TUser;

export class User implements TUser
{
    _id: Id = "0";
    nameFirst: string = '';
    nameLast: string = '';
    dateBirth: Date = new Date();
    gender: Gender = Gender.male;
    motorcyclesOwned: Motorcycle[] = [];
    reviewsPlaced: Review[] = [];
    gangsJoined: Gang[] = [];
    role: IdentityRole | null = null;
    
    constructor(_id = "", nameFirst = '', nameLast = '', dateBirth = new Date(), gender : Gender = Gender.male, motorcyclesOwned : Motorcycle[] = [], reviewsPlaced : Review[] = [], gangsJoined: Gang[] = [], role = null)
    {
        this._id = _id;
        this.nameFirst = nameFirst;
        this.nameLast = nameLast;
        this.dateBirth = dateBirth;
        this.gender = gender;
        this.motorcyclesOwned = motorcyclesOwned;
        this.reviewsPlaced = reviewsPlaced;
        this.gangsJoined = gangsJoined;
        this.role = role;
    }
}