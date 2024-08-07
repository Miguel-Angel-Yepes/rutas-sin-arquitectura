import {DataSource} from 'typeorm';
import { User } from './entities/userEntity'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgre123",
    database: "userPrueba1",
    entities: [User],
    logging: true,
    synchronize: true,
})