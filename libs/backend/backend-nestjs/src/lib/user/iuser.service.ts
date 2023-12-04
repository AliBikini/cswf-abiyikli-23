import { Identity, User } from "@cswf-abiyikli-23/shared/api";
import { Id } from "libs/shared/api/src/lib/models/id.type";

export interface IUserService
{
    TAG: string;
    
    getAll(): Promise<User[]>
    get(id: Id): Promise<User>
    getByEmail(email: string): Promise<User>
    create(user: User): Promise<User>
    update(id: Id, user: User, identity: Identity): Promise<User>
    delete(id: Id, identity: Identity): void;
}

export const IUserService = Symbol("IUserService");