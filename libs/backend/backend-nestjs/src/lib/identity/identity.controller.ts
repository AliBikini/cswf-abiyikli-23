import { Identity, TIdentityCredentials, TIdentityRegister } from '@cswf-abiyikli-23/shared/api';
import { Body, Controller, Get, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { AuthGuardIsValidLogin } from '../auth/auth.guards';

@Controller('identity')
export class IdentityController 
{
    TAG: string = "IdentityController";

    constructor(private identityService: IdentityService)
    {

    }

    @Post('login')
    async login(@Body() data: TIdentityCredentials): Promise<Identity>
    {
        Logger.log('Login', this.TAG)
        return await this.identityService.login(data);
    }

    @Post('register')
    async register(@Body() data: TIdentityRegister): Promise<Identity>
    {
        Logger.log('Register', this.TAG)
        return await this.identityService.register(data);
    }

    @UseGuards(AuthGuardIsValidLogin)
    @Get('validate')
    async validate(@Request() req: any): Promise<Identity>
    {
        Logger.log('Validate', this.TAG)
        return await req.identity as Identity;
    }
}
