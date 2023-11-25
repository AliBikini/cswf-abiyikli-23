import { Controller, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { TUser } from '@cswf-abiyikli-23/shared/api';
import { UserCreateDto, UserUpdateDto } from '@cswf-abiyikli-23/backend/dto';

@Controller('user')
export class UserController 
{
    constructor(private userService: UserService)
    {

    }

    @Get('')
    getAll(): TUser[] {
        return this.userService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): TUser {
        return this.userService.get(id);
    }

    @Post('')
    create(@Body() data: UserCreateDto): TUser {
        return this.userService.create(data);
    }

    @Post(':id')
    update(@Param('id') id: string, @Body() data: UserUpdateDto): TUser {
        return this.userService.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        this.userService.delete(id);
    }
}
