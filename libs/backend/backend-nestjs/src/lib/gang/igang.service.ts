import { Gang, IdentityRole, User } from "@cswf-abiyikli-23/shared/api";
import { Id } from "libs/shared/api/src/lib/models/id.type";

export interface IGangService
{
    TAG: string;

    getAll(): Promise<Gang[]>
    get(id: Id): Promise<Gang>
    create(gang: Gang, userRequestor_id: string): Promise<Gang>
    update(id: Id, gang: Gang, userRequestor_id: string, role: IdentityRole | null): Promise<Gang>
    delete(id: Id, userRequestor_id: string, role: IdentityRole | null): Promise<void>;
    deleteAll(role: IdentityRole | null): Promise<void>;
}

export const IGangService = Symbol("IGangService");