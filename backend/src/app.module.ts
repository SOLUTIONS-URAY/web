import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import {typeOrmConfig} from './db.config';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from './auth/auth.module';
import {TicketModule} from './ticket/ticket.module';
import {UserModule} from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '../.env',
        }),
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthModule,
        TicketModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
