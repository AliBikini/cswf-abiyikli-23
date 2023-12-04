import { Controller, Delete, Inject, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { Gang } from '@cswf-abiyikli-23/shared/api';
import { IGangService } from './igang.service';
import { AuthGuardIsValidLogin } from '../auth/auth.guards';

@Controller('gang')
export class GangController 
{
    constructor(@Inject(IGangService)private gangService: IGangService)
    {}

    @Get('')
    async getAll(): Promise<Gang[]> {
        return await this.gangService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<Gang> {
        return await this.gangService.get(id);
    }

    @UseGuards(AuthGuardIsValidLogin)
    @Post('')
    async create(@Request() req: any, @Body() data: Gang): Promise<Gang> {
        data.userOwner_id = req.identity.user_id;
        return await this.gangService.create(data);
    }

    @UseGuards(AuthGuardIsValidLogin)
    @Post(':id')
    update(@Request() req: any, @Param('id') id: string, @Body() data: Gang): Promise<Gang> {
        return this.gangService.update(id, data, req.identity);
    }

    @UseGuards(AuthGuardIsValidLogin)
    @Delete(':id')
    async delete(@Request() req: any, @Param('id') id: string) {
        await this.gangService.delete(id, req.identity);
    }
}