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
    Gender,
    TMotorcycle,
    TUserCreate,
    TUserUpdate,
    TUserUpsert,
    UserRole
} from '@cswf-abiyikli-23/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class UserCreateDto implements TUserCreate 
{
    @IsString()
    @IsNotEmpty()
    nameFirst!: string;

    @IsString()
    @IsNotEmpty()
    nameLast!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsDate()
    @IsNotEmpty()
    dateBirth!: Date;

    @IsNotEmpty()
    gender!: Gender;

    @IsNotEmpty()
    userRole!: UserRole;

    @IsOptional()
    motorcyclesOwned!: TMotorcycle[];
}

export class UserUpsertDto implements TUserUpsert 
{
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    nameFirst!: string;

    @IsString()
    @IsNotEmpty()
    nameLast!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;
    
    @IsDate()
    @IsNotEmpty()
    dateBirth!: Date;
    
    @IsNotEmpty()
    gender!: Gender;

    @IsNotEmpty()
    userRole!: UserRole;

    @IsOptional()
    motorcyclesOwned!: TMotorcycle[];
}

export class UserUpdateDto implements TUserUpdate 
{
    @IsString()
    @IsOptional()
    nameFirst!: string;

    @IsString()
    @IsOptional()
    nameLast!: string;

    @IsString()
    @IsOptional()
    email!: string;
    
    @IsDate()
    @IsNotEmpty()
    dateBirth!: Date;
    
    @IsNotEmpty()
    gender!: Gender;

    @IsNotEmpty()
    userRole!: UserRole;
}
