import { Gender, IUser, UserRole } from "@cswf-abiyikli-23/shared/api";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class UserService 
{
    TAG = 'MealService';
    private usersTwo$ = new BehaviorSubject<Map<string, IUser>>(new Map());

    constructor() {
        this.usersTwo$.value.set("0", {
            id: '0',
            nameFirst: 'Ali',
            nameLast: 'Biyikli',
            email: "ali@outlook.com",
            dateBirth: new Date("1998-07-02"),
            gender: Gender.male,
            userRole: UserRole.user
        });
        this.usersTwo$.value.set("1", {
            id: '1',
            nameFirst: 'Seher',
            nameLast: 'Akdag',
            email: "seher@outlook.com",
            dateBirth: new Date("1998-08-18"),
            gender: Gender.female,
            userRole: UserRole.user
        });
        this.usersTwo$.value.set("2", {
            id: '2',
            nameFirst: 'Pascal',
            nameLast: 'Stool',
            email: "ps@outlook.com",
            dateBirth: new Date("2019-01-16"),
            gender: Gender.male,
            userRole: UserRole.user
        });
        this.usersTwo$.value.set("3", {
            id: '3',
            nameFirst: 'Pietje',
            nameLast: 'Heushout',
            email: "ph@outlook.com",
            dateBirth: new Date("2019-01-16"),
            gender: Gender.male,
            userRole: UserRole.user
        });
        this.usersTwo$.value.set("4", {
            id: '4',
            nameFirst: 'Wadayaohn',
            nameLast: 'Dawuld',
            email: "wd@outlook.com",
            dateBirth: new Date("2019-01-16"),
            gender: Gender.male,
            userRole: UserRole.user
        });
    }

    private users$ = new BehaviorSubject<IUser[]>([
        {
            id: '0',
            nameFirst: 'Ali',
            nameLast: 'Biyikli',
            email: "ali@outlook.com",
            dateBirth: new Date("1998-07-02"),
            gender: Gender.male,
            userRole: UserRole.user
        },
        {
            id: '1',
            nameFirst: 'Seher',
            nameLast: 'Akdag',
            email: "seher@outlook.com",
            dateBirth: new Date("1998-08-18"),
            gender: Gender.female,
            userRole: UserRole.user
        },
        {
            id: '2',
            nameFirst: 'Pascal',
            nameLast: 'Stool',
            email: "ps@outlook.com",
            dateBirth: new Date("2019-01-16"),
            gender: Gender.male,
            userRole: UserRole.user
        },
        {
            id: '3',
            nameFirst: 'Pietje',
            nameLast: 'Heushout',
            email: "ph@outlook.com",
            dateBirth: new Date("2019-01-16"),
            gender: Gender.male,
            userRole: UserRole.user
        },
        {
            id: '4',
            nameFirst: 'Wadayaohn',
            nameLast: 'Dawuld',
            email: "wd@outlook.com",
            dateBirth: new Date("2019-01-16"),
            gender: Gender.male,
            userRole: UserRole.user
        },
    ]);

    getAll(): IUser[] 
    {
        Logger.log('getAll', this.TAG);
        return [...this.usersTwo$.value.values()];
    }

    get(id: string): IUser 
    {
        Logger.log(`get(${id})`, this.TAG);
        const user = this.usersTwo$.value.get(id);
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
    create(user: Pick<IUser, 'nameFirst' | 'nameLast' | 'email' | 'dateBirth' | 'gender' | 'userRole'>): IUser 
    {
        Logger.log('create', this.TAG);
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const userNew: IUser = 
        {
            ...user,
            id: `meal-${Math.floor(Math.random() * 10000)}`
        };
        this.usersTwo$.value.set(userNew.id, userNew);
        return userNew;
    }

    update(id: string, user: Pick<IUser, 'nameFirst' | 'nameLast' | 'email' | 'dateBirth' | 'gender' | 'userRole'>): IUser 
    {
        Logger.log(`update(${id})`, this.TAG);
        const userToUpdate = this.usersTwo$.value.get(id);
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
        const userToUpdate = this.usersTwo$.value.get(id);
        if (!userToUpdate) {
            throw new NotFoundException(`User could not be found!`);
        }

        this.usersTwo$.value.delete(id);
    }
}