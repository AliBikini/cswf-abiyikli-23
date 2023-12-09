import { IdentityRole, User } from "@cswf-abiyikli-23/shared/api";
import { Id } from "libs/shared/api/src/lib/models/id.type";

export interface IUserService
{
    TAG: string;
    
    getAll(): Promise<User[]>
    get(id: Id): Promise<User>
    getByEmail(email: string): Promise<User>
    create(user: User): Promise<User>
    update(id: Id, data: any, userRequestor_id: string, role: IdentityRole | null): Promise<User>
    delete(id: Id, userRequestor_id: string,  role: IdentityRole | null): void;
}

export const IUserService = Symbol("IUserService");