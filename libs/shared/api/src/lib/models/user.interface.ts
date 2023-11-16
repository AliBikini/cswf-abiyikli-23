import { Id} from "./id.type";

export interface IUser {
    id: Id;
    nameFirst: string;
    nameLast: string;
    email: string;
}

export type IUserCreate = Pick<
    IUser,
    'nameFirst' | 'nameLast' | 'email'
    >;
export type IUserUpdate = Partial<Omit<IUser, 'id'>>;
export type IUserUpsert = IUser;