import { IUser } from "@cswf-abiyikli-23/shared/api";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class UserService 
{
    TAG = 'MealService';

    private users$ = new BehaviorSubject<IUser[]>([
        {
            id: '0',
            nameFirst: 'Ali',
            nameLast: 'Biyikli',
            email: "ali@outlook.com",
        },
        {
            id: '1',
            nameFirst: 'Seher',
            nameLast: 'Akdag',
            email: "seher@outlook.com",
        },
        {
            id: '2',
            nameFirst: 'Pascal',
            nameLast: 'Stool',
            email: "ps@outlook.com",
        },
        {
            id: '3',
            nameFirst: 'Pietje',
            nameLast: 'Heushout',
            email: "ph@outlook.com",
        },
        {
            id: '4',
            nameFirst: 'Wadayaohn',
            nameLast: 'Dawuld',
            email: "wd@outlook.com",
        },
    ]);

    getAll(): IUser[] 
    {
        Logger.log('getAll', this.TAG);
        return this.users$.value;
    }

    get(id: string): IUser 
    {
        Logger.log(`get(${id})`, this.TAG);
        const user = this.users$.value.find((td) => td.id === id);
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
    create(user: Pick<IUser, 'nameFirst' | 'nameLast' | 'email'>): IUser 
    {
        Logger.log('create', this.TAG);
        const current = this.users$.value;
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const userNew: IUser = 
        {
            ...user,
            id: `meal-${Math.floor(Math.random() * 10000)}`
        };
        this.users$.next([...current, userNew]);
        return userNew;
    }
}