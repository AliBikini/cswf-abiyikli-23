import { Id} from "./id.type";
import { TMotorcycle } from "./motorcycle.type";

export enum UserRole 
{
    admin = 'admin',
    user = 'user',
}

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
    userRole: UserRole;
    motorcyclesOwned : TMotorcycle[];
}

export type TUserCreate = Pick<
    TUser,
    'nameFirst' | 'nameLast' | 'email' | 'dateBirth' | 'gender' | 'userRole' | 'motorcyclesOwned'
    >;
export type TUserUpdate = Partial<Omit<TUser, 'id'>>;
export type TUserUpsert = TUser;