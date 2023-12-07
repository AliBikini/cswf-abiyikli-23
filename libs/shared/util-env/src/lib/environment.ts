import { IEnvironment } from "./environment.interface";

export const environment: IEnvironment = {
    dataApiUrl: 'http://localhost:3000/api/',
    mongoConnString: 'mongodb://localhost:27017/motard',
    neo4jScheme: "neo4j",
    neo4jUri: 'localhost',
    neo4jPort: '7687',
    neo4jUser: "neo4j",
    neo4jPassword: "CokianmafiA98.",
    neo4jDb: 'neo4j',
    jwtSecret: 'superSecretjmwnaoiudn23h198eh327643tyg345gnme12uhe2387643g76fge4'
};