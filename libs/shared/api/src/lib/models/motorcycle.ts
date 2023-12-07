import { Id } from "./id.type";

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
    _id: Id;
    nameModel: string;
    body: MotorcycleBody;
    year: string;
    fuel: MotorcycleFuel;
    seatHeight: string;
    horsePower: string;
    topSpeed: string;
    linkImage: string;
}

export type TMotorcycleCreate = Pick<
    TMotorcycle,
    'nameModel' | 'body' | 'year' | 'fuel' | 'seatHeight' | 'horsePower' | 'topSpeed' | 'linkImage'
    >;
export type TMotorcycleUpdate = Partial<Omit<TMotorcycle, 'id'>>;
export type TMotorcycleUpsert = TMotorcycle;

export class Motorcycle implements TMotorcycle
{
    _id: Id = "0";
    nameModel: string = '';
    body: MotorcycleBody = MotorcycleBody.other;
    year: string = '';
    fuel: MotorcycleFuel = MotorcycleFuel.gasoline;
    seatHeight: string = '';
    horsePower: string = '';
    topSpeed: string = '';
    linkImage: string = '';
    
    constructor(_id = "", nameModel = '', body = MotorcycleBody.other, year = '', fuel = MotorcycleFuel.gasoline, seatHeight = '', horsePower = '', topSpeed = '', linkImage = '')
    {
        this._id = _id;
        this.nameModel = nameModel;
        this.body = body;
        this.year = year;
        this.fuel = fuel;
        this.seatHeight = seatHeight;
        this.horsePower = horsePower;
        this.topSpeed = topSpeed;
        this.linkImage = linkImage;
    }

}