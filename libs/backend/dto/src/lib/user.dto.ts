import 
{
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsDate
} from 'class-validator';

import 
{
    IUserCreate,
    IUserUpdate,
    IUserUpsert
} from '@cswf-abiyikli-23/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class UserCreateDto implements IUserCreate 
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
}

export class UserUpsertDto implements IUserUpsert 
{
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    nameFirst!: string;

    @IsString()
    @IsNotEmpty()
    nameLast!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;
}

export class UserUpdateDto implements IUserUpdate 
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
}
