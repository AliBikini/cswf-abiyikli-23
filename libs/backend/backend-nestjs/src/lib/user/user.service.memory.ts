import { IUserService } from "./iuser.service";
import { Gender, Motorcycle, MotorcycleBody, MotorcycleFuel, User, UserRole } from "@cswf-abiyikli-23/shared/api";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";

@Injectable()
export class UserServiceMemory implements IUserService
{
    TAG = 'UserServiceMemory';
    private users = new Map<string, User>(new Map());

    constructor()
    {
        this.users.set("0", {
            _id: '0',
            nameFirst: 'Ali',
            nameLast: 'Biyikli',
            email: "ali@outlook.com",
            dateBirth: new Date("1998-07-02"),
            gender: Gender.male,
            userRole: UserRole.user,
            motorcyclesOwned: [ new Motorcycle() ]
        });
        this.users.set("1", {
            _id: '1',
            nameFirst: 'Seher',
            nameLast: 'Akdag',
            email: "seher@outlook.com",
            dateBirth: new Date("1998-08-18"),
            gender: Gender.female,
            userRole: UserRole.user,
            motorcyclesOwned: []
        });
        this.users.set("2", {
            _id: '2',
            nameFirst: 'Pascal',
            nameLast: 'Stool',
            email: "ps@outlook.com",
            dateBirth: new Date("2019-01-16"),
            gender: Gender.male,
            userRole: UserRole.user,
            motorcyclesOwned: []
        });
        this.users.set("3", {
            _id: '3',
            nameFirst: 'Pietje',
            nameLast: 'Heushout',
            email: "ph@outlook.com",
            dateBirth: new Date("2019-01-16"),
            gender: Gender.male,
            userRole: UserRole.user,
            motorcyclesOwned: []
        });
        this.users.set("4", {
            _id: '4',
            nameFirst: 'Wadayaohn',
            nameLast: 'Dawuld',
            email: "wd@outlook.com",
            dateBirth: new Date("2019-01-16"),
            gender: Gender.male,
            userRole: UserRole.user,
            motorcyclesOwned: []
        });
    }

    async getAll(): Promise<User[]> {
        Logger.log('getAll', this.TAG);
        return [...this.users.values()];
    }

    async get(id: string): Promise<User> {
        Logger.log(`get(${id})`, this.TAG);
        const user = this.users.get(id);
        if (!user) {
            throw new NotFoundException(`User could not be found!`);
        }
        return user;
    }

    async create(user: User): Promise<User> {
        Logger.log('create', this.TAG);
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const userNew: User = 
        {
            ...user,
            motorcyclesOwned: [],
            _id: `meal-${Math.floor(Math.random() * 10000)}`
        };
        this.users.set(userNew._id, userNew);
        return userNew;
    }

    async update(id: string, user: User): Promise<User> {
        Logger.log(`update(${id})`, this.TAG);
        const userToUpdate = this.users.get(id);
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

    delete(id: string): void {
        Logger.log(`update(${id})`, this.TAG);
        const userToUpdate = this.users.get(id);
        if (!userToUpdate) {
            throw new NotFoundException(`User could not be found!`);
        }

        this.users.delete(id);
    }
}