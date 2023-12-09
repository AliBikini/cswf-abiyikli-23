import { environment } from '@cswf-abiyikli-23/shared/util-env';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuardIsValidLogin implements CanActivate {
    private readonly logger = new Logger(AuthGuardIsValidLogin.name);

    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            this.logger.log('No token found');
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: environment.jwtSecret
            });
            this.logger.log('payload', payload);
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['identity_id'] = payload.identity_id;
            request['user_id'] = payload.user_id;
            request['role'] = payload.role;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
