import { MotorcycleCreateDto, MotorcycleUpdateDto } from "@cswf-abiyikli-23/backend/dto";
import { TMotorcycle, MotorcycleBody, MotorcycleFuel } from "@cswf-abiyikli-23/shared/api";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class MotorcycleService 
{
    TAG = 'MotorcycleService';
    private motorcycles$ = new BehaviorSubject<Map<string, TMotorcycle>>(new Map());

    constructor() {
        this.motorcycles$.value.set("0", {
            _id: '0',
            nameModel: 'Triumph Street Triple 675',
            year: '2011',
            body: MotorcycleBody.naked,
            fuel: MotorcycleFuel.gasoline,
            seatHeight: "88cm",
            horsePower: "105",
            topSpeed: "240",
            linkImage: "https://cloud.leparking-moto.fr/2021/07/06/19/01/triumph-street-triple-triumph-street-triple-r-675-2011-blanc_153809063.jpg"
        });
        this.motorcycles$.value.set("1", {
            _id: '1',
            nameModel: 'Kawasaki Vulcan S',
            year: '2018',
            body: MotorcycleBody.cruiser,
            fuel: MotorcycleFuel.gasoline,
            seatHeight: "75cm",
            horsePower: "65",
            topSpeed: "200",
            linkImage: "https://www.motoveda.nl/uploads/img/IMG_22-11-01_13-44-54.jpg"
        });
        this.motorcycles$.value.set("2", {
            _id: '2',
            nameModel: 'Honda CMX500 Rebel',
            year: '2022',
            body: MotorcycleBody.cruiser,
            fuel: MotorcycleFuel.gasoline,
            seatHeight: "73cm",
            horsePower: "45",
            topSpeed: "180",
            linkImage: "https://www.honda.nl/content/dam/central/motorcycles/street/cmx500-rebel_2022/XL-Module/Honda_Rebel_2_Mobile2.jpg/_jcr_content/renditions/m_r.jpg"
        });
        this.motorcycles$.value.set("3", {
            _id: '3',
            nameModel: 'Suzuki GSX-R750',
            year: '2023',
            body: MotorcycleBody.sport,
            fuel: MotorcycleFuel.gasoline,
            seatHeight: "90cm",
            horsePower: "150",
            topSpeed: "300",
            linkImage: "https://www.suzuki.ca/wp-content/uploads/GSX-R750M3_CHL_Right.jpg"
        });
        this.motorcycles$.value.set("4", {
            _id: '4',
            nameModel: 'Kawasaki KLR650',
            year: '1987-1990',
            body: MotorcycleBody.dualSport,
            fuel: MotorcycleFuel.gasoline,
            seatHeight: "100cm",
            horsePower: "42",
            topSpeed: "140",
            linkImage: "https://s1.cdn.autoevolution.com/images/moto_models/KAWASAKI_KLR-650-2006_main.jpg"
        });
    }

    getAll(): TMotorcycle[] 
    {
        Logger.log('getAll', this.TAG);
        return [...this.motorcycles$.value.values()];
    }

    get(id: string): TMotorcycle 
    {
        Logger.log(`get(${id})`, this.TAG);
        const user = this.motorcycles$.value.get(id);
        if (!user) {
            throw new NotFoundException(`User could not be found!`);
        }
        return user;
    }

    create(motorcycle: MotorcycleCreateDto): TMotorcycle 
    {
        Logger.log('create', this.TAG);
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const motorcycleNew: TMotorcycle = 
        {
            ...motorcycle,
            _id: `motorcycle-${Math.floor(Math.random() * 10000)}`
        };
        this.motorcycles$.value.set(motorcycleNew._id, motorcycleNew);
        return motorcycleNew;
    }

    update(id: string, motorcycle: MotorcycleUpdateDto): TMotorcycle 
    {
        Logger.log(`update(${id})`, this.TAG);
        let motorcycleToUpdate = this.motorcycles$.value.get(id);
        if (!motorcycleToUpdate) {
            throw new NotFoundException(`User could not be found!`);
        }

        motorcycleToUpdate = { ...motorcycleToUpdate, ...motorcycle }
        this.motorcycles$.value.set(motorcycleToUpdate._id, motorcycleToUpdate);

        return motorcycleToUpdate;
    }

    delete(id: string)
    {
        Logger.log(`update(${id})`, this.TAG);
        const motorcycleToDelte = this.motorcycles$.value.get(id);
        if (!motorcycleToDelte) {
            throw new NotFoundException(`User could not be found!`);
        }

        this.motorcycles$.value.delete(id);
    }
}