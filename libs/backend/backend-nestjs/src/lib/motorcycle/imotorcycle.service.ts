import { Motorcycle } from "@cswf-abiyikli-23/shared/api";
import { Id } from "libs/shared/api/src/lib/models/id.type";

export interface IMotorcycleService
{
    TAG: string;

    getAll(): Promise<Motorcycle[]>
    get(id: Id): Promise<Motorcycle>
    create(motorcycle: Motorcycle): Promise<Motorcycle>
    update(id: Id, motorcycle: Motorcycle): Promise<Motorcycle>
    delete(id: Id): void;
}

export const IMotorcycleService = Symbol("IMotorcycleService");