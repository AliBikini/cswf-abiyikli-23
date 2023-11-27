import { Controller, Delete, Inject } from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { User } from '@cswf-abiyikli-23/shared/api';
import { IUserService } from './iuser.service';

@Controller('user')
export class UserController 
{
    constructor(@Inject(IUserService)private userService: IUserService)
    {

    }

    @Get('')
    async getAll(): Promise<User[]> {
        return await this.userService.getAll();
    }

    @Get(':id')
    async get(@Param('id') id: string): Promise<User> {
        return await this.userService.get(id);
    }

    @Post('')
    async create(@Body() data: User): Promise<User> {
        return await this.userService.create(data);
    }

    @Post(':id')
    async update(@Param('id') id: string, @Body() data: User): Promise<User> {
        return await this.userService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.userService.delete(id);
    }
}
