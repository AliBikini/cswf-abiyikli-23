import { Controller, Delete } from '@nestjs/common';
import { MotorcycleService } from './motorcycle.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { TMotorcycle } from '@cswf-abiyikli-23/shared/api';
import { MotorcycleCreateDto, MotorcycleUpdateDto } from '@cswf-abiyikli-23/backend/dto';

@Controller('motorcycle')
export class MotorcycleController {
    constructor(private motorcycleService: MotorcycleService)
    {

    }

    @Get('')
    getAll(): TMotorcycle[] {
        return this.motorcycleService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): TMotorcycle {
        return this.motorcycleService.get(id);
    }

    @Post('')
    create(@Body() data: MotorcycleCreateDto): TMotorcycle {
        return this.motorcycleService.create(data);
    }

    @Post(':id')
    update(@Param('id') id: string, @Body() data: MotorcycleUpdateDto): TMotorcycle {
        return this.motorcycleService.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        this.motorcycleService.delete(id);
    }
}