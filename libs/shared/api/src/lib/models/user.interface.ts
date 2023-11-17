import { Id} from "./id.type";

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

export interface IUser 
{
    id: Id;
    nameFirst: string;
    nameLast: string;
    email: string;
    dateBirth: Date;
    gender: Gender;
    userRole: UserRole;
}

export type IUserCreate = Pick<
    IUser,
    'nameFirst' | 'nameLast' | 'email' | 'dateBirth' | 'gender' | 'userRole'
    >;
export type IUserUpdate = Partial<Omit<IUser, 'id'>>;
export type IUserUpsert = IUser;