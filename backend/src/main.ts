import 'reflect-metadata';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import * as process from 'process';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

const path = process.cwd().split('/');
path.pop();
dotenv.config({path: path.join('/') + '/.env'});

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    app.setGlobalPrefix('/v1');
    await app.listen(process.env.BACKEND_PORT ?? 3000);
}

bootstrap();
