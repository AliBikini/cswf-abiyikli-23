import { Id } from "./id.type";
import { TMotorcycle } from "./motorcycle.type";
import { Gender, TUser, UserRole } from "./user.type";

export class User implements TUser
{
    _id: Id = "0";
    nameFirst: string = '';
    nameLast: string = '';
    email: string = '';
    dateBirth: Date = new Date();
    gender: Gender = Gender.other;
    userRole: UserRole = UserRole.user;
    motorcyclesOwned: TMotorcycle[] = [];
    
    constructor(_id = "", nameFirst = '', nameLast = '', email = '', dateBirth = new Date(), gender = Gender.other, userRole = UserRole.user, motorcyclesOwned = [])
    {
        this._id = _id;
        this.nameFirst = nameFirst;
        this.nameLast = nameLast;
        this.email = email;
        this.dateBirth = dateBirth;
        this.gender = gender;
        this.userRole = userRole;
        this.motorcyclesOwned = motorcyclesOwned;
    }
}