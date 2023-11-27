import { User } from "@cswf-abiyikli-23/shared/api";
import { Id } from "libs/shared/api/src/lib/models/id.type";
import { Observable } from "rxjs";

export interface IUserService
{
    TAG: string;
    
    getAll(): Promise<User[]>
    get(id: Id): Promise<User>
    create(user: User): Promise<User>
    update(id: Id, user: User): Promise<User>
    delete(id: Id): void;
}

export const IUserService = Symbol("IUserService");