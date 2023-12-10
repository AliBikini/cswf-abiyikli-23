import { IEnvironment } from "./environment.interface";

export const environment: IEnvironment = {
    dataApiPort: '8080',
    dataApiUrl: 'https://motard-data-api.azurewebsites.net/api/',
    mongoConnString: 'mongodb+srv://AliBikini:CokianmafiA98.@cluster0.z7gyl.mongodb.net/?retryWrites=true&w=majority',
    neo4jScheme: 'neo4j+s' ,
    neo4jUri: 'db9aeb2b.databases.neo4j.io',
    neo4jPort: '7687',
    neo4jUser: 'neo4j' ,
    neo4jPassword: '455nu6lZubp5Qq3Gbsbr8vknUOsPJqJXhyANNECGWVg',
    neo4jDb: 'neo4j',
    jwtSecret: 'superSecretjmwnaoiudn23h198eh327643tyg345gnme12uhe2387643g76fge4'
};