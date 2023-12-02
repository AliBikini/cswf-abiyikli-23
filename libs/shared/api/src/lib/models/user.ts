import { Id } from "./id.type";
import { Motorcycle } from "./motorcycle";

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
}

export type TUserCreate = Pick<
    TUser,
    'nameFirst' | 'nameLast' | 'email' | 'dateBirth' | 'gender' | 'motorcyclesOwned'
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
    
    constructor(_id = "", nameFirst = '', nameLast = '', email = '', password = '', dateBirth = new Date(), gender = Gender.other, motorcyclesOwned = [])
    {
        this._id = _id;
        this.nameFirst = nameFirst;
        this.nameLast = nameLast;
        this.email = email;
        this.dateBirth = dateBirth;
        this.gender = gender;
        this.motorcyclesOwned = motorcyclesOwned;
    }
}