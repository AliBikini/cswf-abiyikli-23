import { Identity, Review, Gang } from "@cswf-abiyikli-23/shared/api";
import { Id } from "libs/shared/api/src/lib/models/id.type";

export interface IGangService
{
    TAG: string;

    getAll(): Promise<Gang[]>
    get(id: Id): Promise<Gang>
    create(gang: Gang): Promise<Gang>
    update(id: Id, gang: Gang, identity: Identity): Promise<Gang>
    delete(id: Id, identity: Identity): Promise<void>;
}

export const IGangService = Symbol("IGangService");