import { Identity, User, IdentityRole, TIdentityCredentials, TIdentityRegister } from "@cswf-abiyikli-23/shared/api";
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

    async login(credentials: TIdentityCredentials): Promise<Identity> {
        Logger.log('Login ' + credentials.email, this.TAG);

        const identity = await this.conn.schemas.modelIdentity!.findOne({ email : credentials.email });

        if (identity?.password != credentials.password) 
        {
            const errMsg = 'Email not found or password invalid';
            Logger.error(errMsg, this.TAG);
            throw new UnauthorizedException(errMsg);
        }

        const user = await this.conn.schemas.modelUser!.findOne({ email : identity.email });

        if (!user)
        {
            const errMsg = `Identity exists, but not user tied to identity. User with email ${identity.email} not found`;
            Logger.error(errMsg, this.TAG);
            throw new UnauthorizedException(errMsg);
        }

        const payload = { _id: identity._id, user_id: user?._id, role: identity.role };

        Logger.debug("Payload: " + payload._id, this.TAG);

        return {
            _id: identity._id,
            user_id: user._id,
            email: identity.email,
            password: identity.password,
            role: identity.role,
            token: await this.jwtService.signAsync(payload)
        };
    }

    async register(identityRegister: TIdentityRegister): Promise<Identity>
    {
        Logger.log('Register ' + identityRegister.user.email, this.TAG);

        if (await this.conn.schemas.modelIdentity!.findOne({ email: identityRegister.user.email })) {
            Logger.debug('identity with email already exists');
            throw new ConflictException('Identity already exists');
        }

        if (await this.conn.schemas.modelUser!.findOne({ email: identityRegister.user.email })) {
            Logger.debug('user with email already exists');
            throw new ConflictException('User already exists');
        }

        Logger.debug('User not found, creating');

        Logger.debug(identityRegister);
        const userNew = await this.userService.create(identityRegister.user as User);

        const identityNew = await new this.conn.schemas.modelIdentity!({
            user_id: userNew._id,
            email: identityRegister.user.email,
            password: identityRegister.password,
            role: identityRegister.role
        })

        if (identityNew == undefined)
        {
            throw new ConflictException('Error with inserting new identity');
        }

        let isFailed: Boolean = false;
        let errorMsg = "";

        try
        {
            await identityNew.save();
        }
        catch(error:any)
        {
            isFailed = true;
            errorMsg = error;
            await this.userService.delete(userNew._id, identityNew);
        }

        if (isFailed == true)
        {
            errorMsg = errorMsg + " Deleted created user with id " + userNew._id;
            Logger.error(errorMsg);
            throw new ConflictException(errorMsg)
        }

        Logger.debug('User created');

        const identityNewLoggedIn = await this.login({ email: identityNew.email, password: identityNew.password });
        return identityNewLoggedIn;
    }
}