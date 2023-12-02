import { Motorcycle, MotorcycleBody, MotorcycleFuel } from "@cswf-abiyikli-23/shared/api";
import { IMotorcycleService } from "./imotorcycle.service";
import { Logger, NotFoundException } from "@nestjs/common";

export class MotorcycleServiceMemory implements IMotorcycleService
{
    TAG: string = "MotorcycleServiceMemory";
    private motorcycles = new Map<string, Motorcycle>(new Map());

    constructor()
    {
        this.motorcycles.set("0", {
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
        this.motorcycles.set("1", {
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
        this.motorcycles.set("2", {
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
        this.motorcycles.set("3", {
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
        this.motorcycles.set("4", {
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

    async getAll(): Promise<Motorcycle[]> {
        Logger.log('getAll', this.TAG);
        return [...this.motorcycles.values()];
    }

    async get(id: string): Promise<Motorcycle> {
        Logger.log(`get(${id})`, this.TAG);
        const motorcycle = this.motorcycles.get(id);
        if (!motorcycle) {
            throw new NotFoundException(`User could not be found!`);
        }
       
        return motorcycle;
    }

    async create(motorcycle: Motorcycle): Promise<Motorcycle> {
        Logger.log('create', this.TAG);
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const motorcycleNew: Motorcycle = 
        {
            ...motorcycle,
            _id: `motorcycle-${Math.floor(Math.random() * 10000)}`
        };
        this.motorcycles.set(motorcycleNew._id, motorcycleNew);
        return motorcycleNew;
    }

    async update(id: string, motorcycle: Motorcycle): Promise<Motorcycle> {
        Logger.log(`update(${id})`, this.TAG);
        let motorcycleToUpdate = this.motorcycles.get(id);
        if (!motorcycleToUpdate) {
            throw new NotFoundException(`User could not be found!`);
        }

        motorcycleToUpdate = { ...motorcycleToUpdate, ...motorcycle }
        this.motorcycles.set(motorcycleToUpdate._id, motorcycleToUpdate);

        return motorcycleToUpdate;
    }

    delete(id: string): void {
        Logger.log(`update(${id})`, this.TAG);
        const motorcycleToDelete = this.motorcycles.get(id);
        if (!motorcycleToDelete) {
            throw new NotFoundException(`User could not be found!`);
        }

        this.motorcycles.delete(id);
    }
}