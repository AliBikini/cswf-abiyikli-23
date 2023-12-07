import { Id } from "./id.type";

export class Gang
{
    _id: Id = '';
    userOwner_id: Id = '';
    name: string = '';
    description: string = '';
    dateCreated: Date = new Date();
    linkEmblem: string = '';

    constructor(_id = '', userOwner_id = '', name = '', description = '', dateCreated = new Date(), linkEmblem = '')
    {
        this._id = _id;
        this.userOwner_id = userOwner_id;
        this.name = name;
        this.description = description;
        this.dateCreated = dateCreated;
        this.linkEmblem = linkEmblem;
    }
}