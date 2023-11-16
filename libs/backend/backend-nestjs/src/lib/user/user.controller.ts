import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { IUser } from '@cswf-abiyikli-23/shared/api';
import { UserCreateDto } from '@cswf-abiyikli-23/backend/dto';

@Controller('user')
export class UserController 
{
    constructor(private userService: UserService)
    {

    }

    @Get('')
    getAll(): IUser[] {
        return this.userService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): IUser {
        return this.userService.get(id);
    }

    @Post('')
    create(@Body() data: UserCreateDto): IUser {
        return this.userService.create(data);
    }
}
