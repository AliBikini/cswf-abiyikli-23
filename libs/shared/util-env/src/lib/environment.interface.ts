import { Neo4jScheme } from "nest-neo4j/dist";

export interface IEnvironment
{
    dataApiUrl: string;
    mongoConnString: string;
    neo4jScheme: Neo4jScheme;
    neo4jUri: string;
    neo4jPort: string;
    neo4jUser: string;
    neo4jPassword: string;
    neo4jDb: string;
    jwtSecret: string;
}