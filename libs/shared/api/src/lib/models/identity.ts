import { IdentityRole } from "./enums";
import { Id } from "./id.type"
import { User } from "./user";


export type TIdentityCredentials =
{
    email: string,
    password: string
}

export type TIdentityRegister =
{
    email: string,
    password: string,
    role: IdentityRole,
    user: User,
}

export class Identity
{
    _id: Id = '0';
    user: User | null = null;
    email: string = ''
    password: string = ''
    role: IdentityRole = IdentityRole.user;
    token?: string = undefined;

    constructor(_id = '', user = null, email = '', password = '', role = IdentityRole.user, token = undefined)
    {
        this._id = _id;
        this.user = user;
        this.password = password;
        this.role = role;
        this.token = token;
    }
}