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

export type TUser =
{
    id: Id;
    nameFirst: string;
    nameLast: string;
    email: string;
    dateBirth: Date;
    gender: Gender;
    userRole: UserRole;
}

export type TUserCreate = Pick<
    TUser,
    'nameFirst' | 'nameLast' | 'email' | 'dateBirth' | 'gender' | 'userRole'
    >;
export type TUserUpdate = Partial<Omit<TUser, 'id'>>;
export type TUserUpsert = TUser;