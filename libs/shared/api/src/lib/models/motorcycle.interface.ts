import { Id} from "./id.type";

export enum MotorcycleBody 
{
    other = 'Other',
    naked = 'Naked',
    sport = 'Sport',
    cruiser = 'Cruiser',
    adventure = 'Adventure',
    touring = 'Touring',
    dualSport = 'Dual-Sport',
    enduro = 'Enduro'
}

export enum MotorcycleFuelType 
{
    gasoline = 'Gasoline',
    diesel = 'Diesel',
    electric = 'Electric'
}

export enum Gender 
{
    male = 'Male',
    female = 'Female',
    other = 'Other',
}

export interface IMotorcycle 
{
    id: Id;
    modelName: string;
    body: MotorcycleBody;
    year: string;
    fuelType: MotorcycleFuelType;
    seatHeight: string;
    horsePower: string;
    topSpeed: string;
}

export type IMotorcycleCreate = Pick<
    IMotorcycle,
    'modelName' | 'body' | 'year' | 'fuelType' | 'seatHeight' | 'horsePower' | 'topSpeed'
    >;
export type IMotorcycleUpdate = Partial<Omit<IMotorcycle, 'id'>>;
export type IMotorcycleUpsert = IMotorcycle;