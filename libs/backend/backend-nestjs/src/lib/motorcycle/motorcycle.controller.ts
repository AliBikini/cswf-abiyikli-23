import { Controller, Delete, Inject, UseGuards, Request, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { Motorcycle, Review, User } from '@cswf-abiyikli-23/shared/api';
import { IMotorcycleService } from './imotorcycle.service';
import { AuthGuardIsValidLogin } from '../auth/auth.guards';
import { IdentityRole } from 'libs/shared/api/src/lib/models/enums';
import { IReviewService } from '../review/ireview.service';

@Controller('motorcycle')
export class MotorcycleController 
{
    constructor(@Inject(IMotorcycleService)private motorcycleService: IMotorcycleService, @Inject(IReviewService)private reviewService: IReviewService)
    {

    }

    @Get('')
    async getAll(): Promise<Motorcycle[]> {
        return await this.motorcycleService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<Motorcycle> {
        return await this.motorcycleService.get(id);
    }

    @Get(':id/reviews')
    async getReviewsOfMotorcycle(@Param('id') id: string): Promise<Review[]> {
        const motorcycle = await this.motorcycleService.get(id);

        if (!motorcycle)
        {
            throw new NotFoundException("Could not find motorcycle with id " + id);
        }

        return await this.reviewService.getAllByMotorcycle(motorcycle._id)
    }

    @UseGuards(AuthGuardIsValidLogin)
    @Post('')
    async create(@Request() req: any, @Body() data: Motorcycle): Promise<Motorcycle> {
        if (req.role != IdentityRole.admin)
        {
            throw new UnauthorizedException();
        }

        return await this.motorcycleService.create(data);
    }

    @UseGuards(AuthGuardIsValidLogin)
    @Post(':id')
    async update(@Request() req: any, @Param('id') id: string, @Body() data: Motorcycle): Promise<Motorcycle> {
        if (req.role != IdentityRole.admin)
        {
            throw new UnauthorizedException();
        }

        return await this.motorcycleService.update(id, data);
    }

    @UseGuards(AuthGuardIsValidLogin)
    @Delete(':id')
    async delete(@Request() req: any, @Param('id') id: string) {
        if (req.role != IdentityRole.admin)
        {
            throw new UnauthorizedException();
        }

        await this.motorcycleService.delete(id);
    }
}