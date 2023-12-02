import { Id } from "./id.type";
import { MotorcycleBody, MotorcycleFuel, TMotorcycle } from "./motorcycle.type";
import { Gender, TUser, UserRole } from "./user.type";

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