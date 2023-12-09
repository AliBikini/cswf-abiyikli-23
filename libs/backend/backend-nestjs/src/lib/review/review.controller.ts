import { Controller, Delete, Inject, UseGuards, Request, UnauthorizedException, Query } from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { Review } from '@cswf-abiyikli-23/shared/api';
import { IReviewService } from './ireview.service';
import { AuthGuardIsValidLogin } from '../auth/auth.guards';

@Controller('review')
export class ReviewController 
{
    constructor(@Inject(IReviewService)private reviewService: IReviewService)
    {}

    @Get('')
    async getAll(): Promise<Review[]> {
        return await this.reviewService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<Review> {
        console.log("GETONE: " + id);
        return await this.reviewService.get(id);
    }

    @UseGuards(AuthGuardIsValidLogin)
    @Post(':motorcycle_id')
    async create(@Request() req: any, @Param() motorcycle_id: any, @Body() data: Review): Promise<Review> {
        return await this.reviewService.create(motorcycle_id.motorcycle_id, data, req.user_id);
    }

    // @UseGuards(AuthGuardIsValidLogin)
    // @Post(':id')
    // update(@Request() req: any, @Param('id') id: string, @Body() data: Review): Promise<Review> {
    //     if (req.identity.role != "admin")
    //     {
    //         throw new UnauthorizedException();
    //     }

    //     return this.reviewService.update(id, data);
    // }

    @UseGuards(AuthGuardIsValidLogin)
    @Delete(':id')
    async delete(@Request() req: any, @Param('id') id: string) {
        await this.reviewService.delete(id, req.user);
    }
}