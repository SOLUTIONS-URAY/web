import 'dotenv/config';
import {DataSource, DataSourceOptions} from 'typeorm';
import * as process from 'process';
import * as dotenv from 'dotenv';
import {Ticket} from "./models/Ticket";
import {TicketEvent} from "./models/TicketEvent";
import {User} from "./models/User";
import {Init1732450281312} from "./migrations/1732450281312-Init";
import {Organization} from "./models/Organization";
import {AddOrganization1732476052030} from "./migrations/1732476052030-AddOrganization";

const path = process.cwd().split('/');
path.pop();
dotenv.config({path: path.join('/') + '/.env'});


export const typeOrmConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.PGHOST || 'localhost',
    port: 5432,
    username: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'postgres',
    entities: [Ticket, TicketEvent, User, Organization],
    subscribers: [],
    synchronize: false,
    logging: true,
    migrationsTableName: '_migrations',
    migrationsRun: true,
    migrations: [
        Init1732450281312,
        AddOrganization1732476052030
    ],
};
export const dataSource = new DataSource(typeOrmConfig);