import { Controller, Delete, Inject, UseGuards, Request, UnauthorizedException, Query } from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { Gang, Motorcycle } from '@cswf-abiyikli-23/shared/api';
import { AuthGuardIsValidLogin } from '../auth/auth.guards';
import { RecoService } from './reco.service';

@Controller('reco')
export class RecoController 
{
    constructor(private recoService: RecoService)
    {}

    @Get('motorcycle/alsoLiked')
    async getOtherMotorcyclesLikedByUsersWhoLikedThisMotorcycle(@Query('user_id') user_id: string, @Query('motorcycle_id') motorcycle_id: string) : Promise<Motorcycle[]>
    {
        return await this.recoService.getOtherMotorcyclesLikedByUsersWhoLikedThisMotorcycle(user_id, motorcycle_id);
    }

    
    @Get('motorcycle/likedInstead')
    async getOtherMotorcyclesLikedByUsersWhoDislikedThisMotorcycle(@Query('user_id') user_id: string, @Query('motorcycle_id') motorcycle_id: string) : Promise<Motorcycle[]>
    {
        return await this.recoService.getOtherMotorcyclesLikedByUsersWhoDisikedThisMotorcycle(user_id, motorcycle_id);
    }

    @Get('motorcycle/riddenByMembers')
    async getMotorcyclesRiddenByMembersOfGang(@Query('user_id') user_id: string, @Query('gang_id') gang_id: string) : Promise<Motorcycle[]>
    {
        return await this.recoService.getMotorcyclesRiddenByMembersOfGang(user_id, gang_id);
    }

    @Get('gang/ridingMotorcycle')
    async getGangsRidingMotorcycle(@Query('user_id') user_id: string, @Query('motorcycle_id') motorcycle_id: string) : Promise<Gang[]>
    {
        return await this.recoService.getGangsRidingMotorcycle(user_id, motorcycle_id);
    }
}