import 
{
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsDate,
} from 'class-validator';

import 
{
    TMotorcycleCreate,
    TMotorcycleUpdate,
    TMotorcycleUpsert,
    MotorcycleBody,
    MotorcycleFuel
} from '@cswf-abiyikli-23/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class MotorcycleCreateDto implements TMotorcycleCreate 
{
    @IsString()
    @IsNotEmpty()
    nameModel!: string;

    @IsNotEmpty()
    body!: MotorcycleBody;

    @IsString()
    @IsNotEmpty()
    year!: string;

    @IsNotEmpty()
    fuel!: MotorcycleFuel;

    @IsString()
    @IsNotEmpty()
    seatHeight!: string;

    @IsString()
    @IsNotEmpty()
    horsePower!: string;

    @IsString()
    @IsNotEmpty()
    topSpeed!: string;

    @IsString()
    @IsNotEmpty()
    linkImage!: string;
}

export class MotorcycleUpsertDto implements TMotorcycleUpsert 
{
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    nameModel!: string;

    @IsNotEmpty()
    body!: MotorcycleBody;

    @IsString()
    @IsNotEmpty()
    year!: string;

    @IsNotEmpty()
    fuel!: MotorcycleFuel;

    @IsString()
    @IsNotEmpty()
    seatHeight!: string;

    @IsString()
    @IsNotEmpty()
    horsePower!: string;

    @IsString()
    @IsNotEmpty()
    topSpeed!: string;

    @IsString()
    @IsNotEmpty()
    linkImage!: string;
}

export class MotorcycleUpdateDto implements TMotorcycleUpdate
{
    @IsString()
    @IsOptional()
    nameModel!: string;

    @IsNotEmpty()
    body!: MotorcycleBody;

    @IsString()
    @IsOptional()
    year!: string;

    @IsNotEmpty()
    fuel!: MotorcycleFuel;

    @IsString()
    @IsOptional()
    seatHeight!: string;

    @IsString()
    @IsOptional()
    horsePower!: string;

    @IsString()
    @IsOptional()
    topSpeed!: string;
}
