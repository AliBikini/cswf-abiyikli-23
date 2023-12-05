import { IEnvironment } from "./environment.interface";

export const environment: IEnvironment = {
    dataApiUrl: 'http://localhost:3000/api/',
    mongoConnString: 'mongodb://localhost:27017/motard',
    neo4jConnString: 'neo4j://localhost:7687'
};