import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Ticket} from "../models/Ticket";
import {AuthModule} from "../auth/auth.module";
import {TicketEvent} from "../models/TicketEvent";

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, TicketEvent]),
    AuthModule
  ],
  controllers: [TicketController],
  providers: [TicketService]
})
export class TicketModule {}
