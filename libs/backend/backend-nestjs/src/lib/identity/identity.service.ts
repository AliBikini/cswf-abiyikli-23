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

        const payload = { _id: identity._id, role: identity.role };

        Logger.debug("Payload: " + payload._id, this.TAG);

        return {
            _id: identity._id,
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

        const identityNew = await new this.conn.schemas.modelIdentity!({
            email: identityRegister.user.email,
            password: identityRegister.password,
            role: identityRegister.role
        })

        if (identityNew == undefined)
        {
            throw new ConflictException('Error with inserting new identity');
        }

        await identityNew.save();

        //this line assumes userservice will always work... not great
        const userNew = await this.userService.create(identityRegister.user);
        Logger.debug('User created');

        return identityNew;
    }
}