import { Id } from "./id.type"
import { User } from "./user";

export enum IdentityRole 
{
    admin = 'admin',
    user = 'user',
}

export type TIdentityCredentials =
{
    email: string,
    password: string
}

export type TIdentityRegister =
{
    user: User,
    password: string,
    role: IdentityRole
}

export class Identity
{
    _id: Id = '0';
    email: string = '';
    password: string = ''
    role: IdentityRole = IdentityRole.user;
    token?: string = undefined;

    constructor(_id = '', email = '', password = '', role = IdentityRole.user, token = undefined)
    {
        this._id = _id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.token = token;
    }
}