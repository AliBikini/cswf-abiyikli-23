import { Id } from "./id.type";
import { User } from "./user";

export type TGangCreate = 
{
    name: string;
    description: string;
    dateCreated: Date;
    linkEmblem: string;
    userOwner: User;
}

export type TGangUpdate = 
{
    name: string;
    description: string;
    linkEmblem: string;
}

export class Gang
{
    _id: Id = '';
    userOwner: User | null = null;
    name: string = '';
    description: string = '';
    dateCreated: Date = new Date();
    linkEmblem: string = '';

    constructor(_id = '', userOwner = null, name = '', description = '', dateCreated = new Date(), linkEmblem = '')
    {
        this._id = _id;
        this.userOwner = userOwner;
        this.name = name;
        this.description = description;
        this.dateCreated = dateCreated;
        this.linkEmblem = linkEmblem;
    }
}