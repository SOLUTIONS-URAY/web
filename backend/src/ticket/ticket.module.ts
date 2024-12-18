import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../models/Ticket';
import { AuthModule } from '../auth/auth.module';
import { TicketEvent } from '../models/TicketEvent';
import { TicketType } from '../models/TicketType';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, TicketEvent, TicketType]),
    AuthModule,
  ],
  controllers: [TicketController],
  providers: [TicketService, RedisService],
})
export class TicketModule {}
