import { Controller, Delete, Inject } from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { Motorcycle } from '@cswf-abiyikli-23/shared/api';
import { IMotorcycleService } from './imotorcycle.service';

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

    @Post('')
    create(@Body() data: Motorcycle): Promise<Motorcycle> {
        return this.motorcycleService.create(data);
    }

    @Post(':id')
    update(@Param('id') id: string, @Body() data: Motorcycle): Promise<Motorcycle> {
        return this.motorcycleService.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        this.motorcycleService.delete(id);
    }
}