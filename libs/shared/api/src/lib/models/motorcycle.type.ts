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

export enum MotorcycleFuel 
{
    gasoline = 'Gasoline',
    diesel = 'Diesel',
    electric = 'Electric'
}

export type TMotorcycle =
{
    id: Id;
    nameModel: string;
    body: MotorcycleBody;
    year: string;
    fuelType: MotorcycleFuel;
    seatHeight: string;
    horsePower: string;
    topSpeed: string;
    linkImage: string;
}

export type TMotorcycleCreate = Pick<
    TMotorcycle,
    'nameModel' | 'body' | 'year' | 'fuelType' | 'seatHeight' | 'horsePower' | 'topSpeed' | 'linkImage'
    >;
export type TMotorcycleUpdate = Partial<Omit<TMotorcycle, 'id'>>;
export type TMotorcycleUpsert = TMotorcycle;