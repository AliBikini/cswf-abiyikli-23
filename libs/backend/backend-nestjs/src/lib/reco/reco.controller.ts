import { Controller, Delete, Inject, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { Motorcycle } from '@cswf-abiyikli-23/shared/api';
import { AuthGuardIsValidLogin } from '../auth/auth.guards';
import { RecoService } from './reco.service';

@Controller('reco')
export class RecoController 
{
    constructor(private recoService: RecoService)
    {}
}