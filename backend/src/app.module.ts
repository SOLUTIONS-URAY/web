import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import {typeOrmConfig} from './db.config';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import {JwtModule, JwtService} from "@nestjs/jwt";
import { TicketModule } from './ticket/ticket.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '../.env',
        }),
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthModule,
        TicketModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
