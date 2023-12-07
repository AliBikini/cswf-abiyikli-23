import { Controller, Delete, Inject, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { Motorcycle } from '@cswf-abiyikli-23/shared/api';
import { IMotorcycleService } from './imotorcycle.service';
import { AuthGuardIsValidLogin } from '../auth/auth.guards';

@Controller('motorcycle')
export class MotorcycleController 
{
    constructor(@Inject(IMotorcycleService)private motorcycleService: IMotorcycleService)
    {

    }

    @Get('')
    getAll(): Promise<Motorcycle[]> {
        return this.motorcycleService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Motorcycle> {
        return this.motorcycleService.get(id);
    }

    @UseGuards(AuthGuardIsValidLogin)
    @Post('')
    create(@Request() req: any, @Body() data: Motorcycle): Promise<Motorcycle> {
        if (req.identity.role != "admin")
        {
            throw new UnauthorizedException();
        }

        return this.motorcycleService.create(data);
    }

    @UseGuards(AuthGuardIsValidLogin)
    @Post(':id')
    update(@Request() req: any, @Param('id') id: string, @Body() data: Motorcycle): Promise<Motorcycle> {
        if (req.identity.role != "admin")
        {
            throw new UnauthorizedException();
        }

        return this.motorcycleService.update(id, data);
    }

    @UseGuards(AuthGuardIsValidLogin)
    @Delete(':id')
    delete(@Request() req: any, @Param('id') id: string) {
        if (req.identity.role != "admin")
        {
            throw new UnauthorizedException();
        }

        this.motorcycleService.delete(id);
    }
}