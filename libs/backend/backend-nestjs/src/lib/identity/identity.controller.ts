import { TIdentityCredentials, TIdentityRegister, User, IdentityRole } from '@cswf-abiyikli-23/shared/api';
import { Body, Controller, Get, Inject, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { AuthGuardIsValidLogin } from '../auth/auth.guards';
import { IUserService } from '../user/iuser.service';

@Controller('identity')
export class IdentityController 
{
    TAG: string = "IdentityController";

    constructor(private identityService: IdentityService, @Inject(IUserService)private userService: IUserService)
    {

    }

    @Post('login')
    async login(@Body() data: TIdentityCredentials): Promise<string>
    {
        Logger.log('Login', this.TAG)
        return await this.identityService.login(data);
    }

    @Post('register')
    async register(@Body() data: TIdentityRegister): Promise<string>
    {
        Logger.log('Register', this.TAG)
        return await this.identityService.register(data);
    }

    @UseGuards(AuthGuardIsValidLogin)
    @Get('validate')
    async validate(@Request() req: any): Promise<any>
    {
        Logger.log('Validate', this.TAG)

        const user = {
            user: await this.userService.get(req.user_id),
            role: req.role
        } 

        Logger.debug(user, this.TAG)
        return user;
    }
}
