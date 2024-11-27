import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import {typeOrmConfig} from './db.config';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import {JwtModule, JwtService} from "@nestjs/jwt";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '../.env',
        }),
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
