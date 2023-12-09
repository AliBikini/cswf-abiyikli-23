import { User, TIdentityCredentials, TIdentityRegister, IdentityRole } from "@cswf-abiyikli-23/shared/api";
import { ConflictException, Inject, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { MongooseConnection } from "../mongooseConnection/mongooseConnection";
import { JwtService } from '@nestjs/jwt';
import { IUserService } from "../user/iuser.service";

@Injectable()
export class IdentityService
{
    TAG: string = "IdentityService";

    constructor (private conn: MongooseConnection, private jwtService: JwtService, @Inject(IUserService)private userService: IUserService)
    {
        this.conn = conn;
    }

    async login(credentials: TIdentityCredentials): Promise<string> {
        Logger.log('Login ' + credentials.email, this.TAG);

        const identityResult = await this.conn.schemas.modelIdentity!.findOne({ email: credentials.email });

        if (!identityResult || identityResult.password != credentials.password) 
        {
            const errMsg = 'Email not found or password invalid';
            Logger.error(errMsg + " Identity: " + identityResult, this.TAG);
            throw new UnauthorizedException(errMsg);
        }

        const user: User = await this.userService.get(identityResult!.user!._id);
        user.role = identityResult.role;

        const payload = { identity_id: identityResult.id, user_id: user._id, role: identityResult.role };

        Logger.debug(payload, this.TAG);
        return await this.jwtService.signAsync(payload);
    }

    async register(identityRegister: TIdentityRegister): Promise<string>
    {
        Logger.log('Register ' + identityRegister.email, this.TAG);

        if (await this.conn.schemas.modelIdentity!.findOne({ email: identityRegister.email })) {
            Logger.debug('identity with email already exists', this.TAG);
            throw new ConflictException('Identity already exists');
        }

        // if (await this.conn.schemas.modelIdentity!.findOne({ email: identityRegister.user.email })) {
        //     Logger.debug('identity with email already exists', this.TAG);
        //     throw new ConflictException('Identity already exists');
        // }

        Logger.debug('Identity not found, creating');
        const userNew = await this.userService.create(identityRegister.user as User);

        if (userNew == undefined)
        {
            throw new ConflictException('Error with inserting new user');
        }

        const identityNew = await new this.conn.schemas.modelIdentity!({
            email: identityRegister.email,
            password: identityRegister.password,
            role: identityRegister.role,
            user: userNew
        })

        let isFailed: Boolean = false;
        let errorObj: any;

        try
        {
            await identityNew.save();
        }
        catch(error:any)
        {
            isFailed = true;
            errorObj = error;
            await this.userService.delete(userNew._id, userNew._id, IdentityRole.admin);
        }

        if (isFailed == true)
        {
            errorObj = errorObj + " Deleted created user with id " + userNew._id;
            Logger.error(errorObj);
            throw new ConflictException(errorObj._message, errorObj.message);
        }

        Logger.debug('User created', this.TAG);

        const identityNewLoggedIn = await this.login({ email: identityNew.email, password: identityNew.password });
        return identityNewLoggedIn;
    }
}