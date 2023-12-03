import { Controller, Delete, Inject, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
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
    getAll(): Promise<Review[]> {
        return this.reviewService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Review> {
        return this.reviewService.get(id);
    }

    @UseGuards(AuthGuardIsValidLogin)
    @Post('')
    create(@Request() req: any, @Body() data: Review): Promise<Review> {
        data.user_id = req.identity._id;
        return this.reviewService.create(data);
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
    delete(@Request() req: any, @Param('id') id: string) {
        if (req.identity.role == "user")
        {
            if (req.identity._id != id)
            {
                throw new UnauthorizedException("You're not the user who placed this review");
            }
        }

        this.reviewService.delete(id);
    }
}