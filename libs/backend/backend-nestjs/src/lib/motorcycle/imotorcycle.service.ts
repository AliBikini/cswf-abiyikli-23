import { Motorcycle } from "@cswf-abiyikli-23/shared/api";
import { Id } from "libs/shared/api/src/lib/models/id.type";

export interface IMotorcycleService
{
    TAG: string;

    getAll(): Motorcycle[]
    get(id: Id): Motorcycle
    create(motorcycle: Motorcycle): Motorcycle
    update(id: Id, motorcycle: Motorcycle): Motorcycle
    delete(id: Id): void;
}

export const IMotorcycleService = Symbol("IMotorcycleService");