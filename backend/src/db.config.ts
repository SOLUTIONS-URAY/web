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
import {TicketType} from "./models/TicketType";
import {NotStaticTicketType1732523088291} from "./migrations/1732523088291-NotStaticTicketType";
import {FixRelations1732704373197} from "./migrations/1732704373197-FixRelations";
import {AddSyntData1732729193083} from "./migrations/1732729193083-AddSyntData";
import {ChangeTicketStatusEnum1732734618117} from "./migrations/1732734618117-ChangeTicketStatusEnum";
import {AddCreatedAtFieldToTicketEvent1732739075549} from "./migrations/1732739075549-AddCreatedAtFieldToTicketEvent";
import {AddTypeForTicketEvent1732746313642} from "./migrations/1732746313642-AddTypeForTicketEvent";

const path = process.cwd().replaceAll("\\", "/").split('/');
path.pop();
dotenv.config({path: path.join('/') + '/.env'});


export const typeOrmConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.PGHOST || 'localhost',
    port: 5432,
    username: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'postgres',
    entities: [
        Ticket, TicketEvent, User, Organization, TicketType
    ],
    subscribers: [],
    synchronize: false,
    logging: true,
    migrationsTableName: '_migrations',
    migrationsRun: true,
    migrations: [
        Init1732450281312,
        AddOrganization1732476052030,
        NotStaticTicketType1732523088291,
        FixRelations1732704373197,
        AddSyntData1732729193083,
        ChangeTicketStatusEnum1732734618117,
        AddCreatedAtFieldToTicketEvent1732739075549,
        AddTypeForTicketEvent1732746313642
    ],
};
export const dataSource = new DataSource(typeOrmConfig);