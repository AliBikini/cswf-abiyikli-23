import { Controller, Delete, Inject, UseGuards, Request, Logger, UnauthorizedException } from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { User } from '@cswf-abiyikli-23/shared/api';
import { IUserService } from './iuser.service';
import { AuthGuardIsValidLogin } from '../auth/auth.guards';

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

    //// Creation of user must be done by Identity controller/service
    // @Post('')
    // async create(@Body() data: User): Promise<User> {
    //     return await this.userService.create(data);
    // }

    @UseGuards(AuthGuardIsValidLogin)
    @Post(':id')
    async update(@Request() req: any, @Param('id') id: string, @Body() data: any): Promise<User> {
        return await this.userService.update(id, data, req.user_id, req.role);
    }

    @UseGuards(AuthGuardIsValidLogin)
    @Delete(':id')
    async delete(@Request() req: any, @Param('id') id: string) {
        await this.userService.delete(id, req.user_id, req.role);
    }
}
