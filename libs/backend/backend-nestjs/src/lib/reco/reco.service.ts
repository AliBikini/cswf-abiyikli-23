import { Gang, Identity, Motorcycle, User } from "@cswf-abiyikli-23/shared/api";
import { Inject, Injectable, Logger, UnauthorizedException, forwardRef } from "@nestjs/common";
import { Neo4jService } from "nest-neo4j/dist";
import { IMotorcycleService } from "../motorcycle/imotorcycle.service";
import { IUserService } from "../user/iuser.service";
import { IGangService } from "../gang/igang.service";

@Injectable()
export class RecoService
{
    TAG: string = "RecoService";

    constructor(private neo4jService: Neo4jService, @Inject(forwardRef(() => IMotorcycleService))private motorcycleService: IMotorcycleService, @Inject(forwardRef(() => IGangService))private gangService: IGangService)
    {}

    async getOtherMotorcyclesLikedByUsersWhoLikedThisMotorcycle(user_id: string, motorcycle_id: string) : Promise<Motorcycle[]>
    {
        const params = {
            user_mongo_id: user_id,
            motorcycle_mongo_id: motorcycle_id
        }

        const cypher = 
        "MATCH (uMe:User { mongo_id: $user_mongo_id }) \n"+
        "MATCH (uOther:User)-[:LIKES]->(mSubject:Motorcycle { mongo_id: $motorcycle_mongo_id }) \n" +
        "MATCH (uOther)-[:LIKES]->(mOther:Motorcycle) \n" +
        "WHERE NOT (uMe)-[:LIKES]-(mOther) \n" +
        "return mOther"
        ;

        const result =  await this.neo4jService.read(cypher, params);
        const motorcyclesReco = [];

        for (let i = 0; i < result.records.length; i++)
        {
            const idMotorcycleOther = result.records.at(i)?.get("mOther").properties.mongo_id;
            const motorcycleReco = await this.motorcycleService.get(idMotorcycleOther);

            if (motorcycleReco)
            {
                motorcyclesReco.push(motorcycleReco);
            }
        }

        Logger.debug(motorcyclesReco, this.TAG);
        return motorcyclesReco;
    }

    async getOtherMotorcyclesLikedByUsersWhoDisikedThisMotorcycle(user_id: string, motorcycle_id: string) : Promise<Motorcycle[]>
    {
        const params = {
            user_mongo_id: user_id,
            motorcycle_mongo_id: motorcycle_id
        }

        const cypher = 
        "MATCH (uMe:User { mongo_id: $user_mongo_id }) \n"+
        "MATCH (uOther:User)-[:DISLIKES]->(mSubject:Motorcycle { mongo_id: $motorcycle_mongo_id }) \n" +
        "MATCH (uOther)-[:LIKES]->(mOther:Motorcycle) \n" +
        "WHERE NOT (uMe)-[:LIKES]-(mOther) \n" +
        "return mOther"
        ;

        Logger.debug(cypher, this.TAG);

        const result =  await this.neo4jService.read(cypher, params);
        const motorcyclesReco = [];

        for (let i = 0; i < result.records.length; i++)
        {
            const idMotorcycleOther = result.records.at(i)?.get("mOther").properties.mongo_id;
            const motorcycleReco = await this.motorcycleService.get(idMotorcycleOther);

            if (motorcycleReco)
            {
                motorcyclesReco.push(motorcycleReco);
            }
        }

        return motorcyclesReco;
    }

    async getMotorcyclesRiddenByMembersOfGang(user_id: string, gang_id: string) : Promise<Motorcycle[]>
    {
        const params = {
            user_mongo_id: user_id,
            gang_mongo_id: gang_id
        }

        const cypher = 
        "MATCH (uMe:User { mongo_id: $user_mongo_id }) \n"+
        "MATCH (g:Gang { mongo_id: $gang_mongo_id }) \n" +
        "MATCH (uMember:User)-[:MEMBER]->(g) \n" +
        "MATCH (uMember)-[:RIDES]->(m:Motorcycle) \n" +
        "WHERE NOT (uMe)-[:RIDES]->(m) \n" +
        "return m"
        ;

        Logger.debug(cypher, this.TAG);

        const result =  await this.neo4jService.read(cypher, params);
        const motorcyclesReco = [];

        for (let i = 0; i < result.records.length; i++)
        {
            const idMotorcycle = result.records.at(i)?.get("m").properties.mongo_id;
            const motorcycleReco = await this.motorcycleService.get(idMotorcycle);

            if (motorcycleReco)
            {
                motorcyclesReco.push(motorcycleReco);
            }
        }

        return motorcyclesReco;
    }

    async getGangsRidingMotorcycle(user_id: string, motorcycle_id: string) : Promise<Gang[]>
    {
        const params = {
            user_mongo_id: user_id,
            motorcycle_mongo_id: motorcycle_id
        }

        const cypher = 
        "MATCH (uMe:User { mongo_id: $user_mongo_id }) \n"+
        "MATCH (m:Motorcycle { mongo_id: $motorcycle_mongo_id }) \n" +
        "MATCH (uOther:User)-[:RIDES]->(m) \n" +
        "MATCH (uOther)-[:MEMBER]->(gOther:Gang) \n" +
        "WHERE NOT (uMe)-[:MEMBER]->(gOther) \n" +
        "RETURN gOther"
        ;

        Logger.debug(cypher, this.TAG);

        const result =  await this.neo4jService.read(cypher, params);
        const gangsReco = [];

        for (let i = 0; i < result.records.length; i++)
        {
            const idGang = result.records.at(i)?.get("gOther").properties.mongo_id;
            const gangReco = await this.gangService.get(idGang);

            if (gangReco)
            {
                gangsReco.push(gangReco);
            }
        }

        return gangsReco;
    }

    async userCreateOrUpdate(user: User, identity?: Identity) : Promise<void>
    {
        Logger.log(`Create or update user: ${user}`, this.TAG);

        // const userExisting = await this.userService.get(user._id);

        // if (userExisting)
        // {
        //     if (identity?.user_id != user._id)
        //     {
        //         throw new UnauthorizedException();
        //     }
        // }

        let params = 
        {
            mongo_id : user._id.toString(),
            name : user.nameFirst.toString() + " " + user.nameLast.toString(),
        }

        let cypher =
        "MERGE (u:User { mongo_id: $mongo_id }) \n" +
        "SET u.name = $name"
        ;

        await this.removeAllRidesRelations(user);
        await this.mergeRidingRelationsOwnedMotorcycles(user);

        const result =  await this.neo4jService.write(cypher, params);
    }

    private async mergeRidingRelationsOwnedMotorcycles(user: User)
    {
        const motorcyclesOwned = user.motorcyclesOwned;

        for (let i = 0; i < motorcyclesOwned.length; i++)
        {
            const params = 
            {
                user_mongo_id : user._id.toString(),
                motorcycle_mongo_id : motorcyclesOwned.at(i)!._id.toString(),
            }

            const cypher =
            "MERGE (u:User { mongo_id: $user_mongo_id }) \n" +
            "MERGE (m:Motorcycle { mongo_id: $motorcycle_mongo_id }) \n" +
            "MERGE (u)-[r:RIDES]->(m)"
            ;

            console.log(cypher);

            await this.neo4jService.write(cypher, params);
        }
    }

    private async removeAllRidesRelations(user: User)
    {
        const params = 
        {
            user_mongo_id : user._id.toString(),
        }

        const cypher =  "MATCH (u:User { mongo_id: $user_mongo_id } )-[r:RIDES]->() \n" +
                        "DELETE r";

        await this.neo4jService.write(cypher, params);
    }

    async motorcycleCreateOrUpdate(motorcycle: Motorcycle, identity?: Identity)
    {
        Logger.log(`Create or update motorcycle: ${motorcycle}`, this.TAG);

        // const userExisting = await this.userService.get(user._id);

        // if (userExisting)
        // {
        //     if (identity?.user_id != user._id)
        //     {
        //         throw new UnauthorizedException();
        //     }
        // }

        const params = 
        {
            mongo_id : motorcycle._id.toString(),
            name : motorcycle.nameModel.toString()
        }

        const cypher =
        "MERGE (m:Motorcycle { mongo_id: $mongo_id }) \n" +
        "SET m.name = $name"
        ;

        const result =  await this.neo4jService.write(cypher, params);
    }

    async gangCreateOrUpdate(gang: Gang, userOwner: User, identity?: Identity)
    {
        Logger.log(`Create or update gang: ${gang}`, this.TAG);

        // const userExisting = await this.userService.get(user._id);

        // if (userExisting)
        // {
        //     if (identity?.user_id != user._id)
        //     {
        //         throw new UnauthorizedException();
        //     }
        // }

        const params = 
        {
            gang_mongo_id : gang._id.toString(),
            gang_name : gang.name.toString(),
            user_mongo_id: userOwner?._id.toString(),
            user_name: userOwner.nameFirst.toString() + " " + userOwner.nameLast.toString()
        }

        const cypher =
        "MERGE (g:Gang { mongo_id: $gang_mongo_id }) \n" +
        "SET g.name = $gang_name \n" +
        "MERGE (u:User { mongo_id: $user_mongo_id }) \n" +
        "SET u.name = $user_name \n" +
        "MERGE (u)-[o:OWNS]->(g) \n" +
        "RETURN g,u,o"
        ;

        const result =  await this.neo4jService.write(cypher, params);
    }
}