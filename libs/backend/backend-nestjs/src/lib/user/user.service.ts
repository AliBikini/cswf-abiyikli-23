import { Gender, MotorcycleBody, MotorcycleFuel, TUser, UserRole } from "@cswf-abiyikli-23/shared/api";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class UserService 
{
    TAG = 'UserService';
    private users$ = new BehaviorSubject<Map<string, TUser>>(new Map());

    constructor() {
        this.users$.value.set("0", {
            id: '0',
            nameFirst: 'Ali',
            nameLast: 'Biyikli',
            email: "ali@outlook.com",
            dateBirth: new Date("1998-07-02"),
            gender: Gender.male,
            userRole: UserRole.user,
            motorcyclesOwned: [
                {
                    id: '0',
                    nameModel: 'Triumph Street Triple 675',
                    year: '2011',
                    body: MotorcycleBody.naked,
                    fuelType: MotorcycleFuel.gasoline,
                    seatHeight: "88cm",
                    horsePower: "105",
                    topSpeed: "240",
                    linkImage: "https://cloud.leparking-moto.fr/2021/07/06/19/01/triumph-street-triple-triumph-street-triple-r-675-2011-blanc_153809063.jpg"
                }
            ]
        });
        this.users$.value.set("1", {
            id: '1',
            nameFirst: 'Seher',
            nameLast: 'Akdag',
            email: "seher@outlook.com",
            dateBirth: new Date("1998-08-18"),
            gender: Gender.female,
            userRole: UserRole.user,
            motorcyclesOwned: []
        });
        this.users$.value.set("2", {
            id: '2',
            nameFirst: 'Pascal',
            nameLast: 'Stool',
            email: "ps@outlook.com",
            dateBirth: new Date("2019-01-16"),
            gender: Gender.male,
            userRole: UserRole.user,
            motorcyclesOwned: []
        });
        this.users$.value.set("3", {
            id: '3',
            nameFirst: 'Pietje',
            nameLast: 'Heushout',
            email: "ph@outlook.com",
            dateBirth: new Date("2019-01-16"),
            gender: Gender.male,
            userRole: UserRole.user,
            motorcyclesOwned: []
        });
        this.users$.value.set("4", {
            id: '4',
            nameFirst: 'Wadayaohn',
            nameLast: 'Dawuld',
            email: "wd@outlook.com",
            dateBirth: new Date("2019-01-16"),
            gender: Gender.male,
            userRole: UserRole.user,
            motorcyclesOwned: []
        });
    }

    getAll(): TUser[] 
    {
        Logger.log('getAll', this.TAG);
        return [...this.users$.value.values()];
    }

    get(id: string): TUser 
    {
        Logger.log(`get(${id})`, this.TAG);
        const user = this.users$.value.get(id);
        if (!user) {
            throw new NotFoundException(`User could not be found!`);
        }
        return user;
    }

        /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    create(user: Pick<TUser, 'nameFirst' | 'nameLast' | 'email' | 'dateBirth' | 'gender' | 'userRole'>): TUser 
    {
        Logger.log('create', this.TAG);
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const userNew: TUser = 
        {
            ...user,
            motorcyclesOwned: [],
            id: `meal-${Math.floor(Math.random() * 10000)}`
        };
        this.users$.value.set(userNew.id, userNew);
        return userNew;
    }

    update(id: string, user: Pick<TUser, 'nameFirst' | 'nameLast' | 'email' | 'dateBirth' | 'gender' | 'userRole'>): TUser 
    {
        Logger.log(`update(${id})`, this.TAG);
        const userToUpdate = this.users$.value.get(id);
        if (!userToUpdate) {
            throw new NotFoundException(`User could not be found!`);
        }

        userToUpdate.nameFirst = user.nameFirst;
        userToUpdate.nameLast = user.nameLast;
        userToUpdate.email = user.email;
        userToUpdate.gender = user.gender;
        userToUpdate.dateBirth = user.dateBirth;
        userToUpdate.userRole = user.userRole;

        return userToUpdate;
    }

    delete(id: string)
    {
        Logger.log(`update(${id})`, this.TAG);
        const userToUpdate = this.users$.value.get(id);
        if (!userToUpdate) {
            throw new NotFoundException(`User could not be found!`);
        }

        this.users$.value.delete(id);
    }
}