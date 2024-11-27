import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Ticket} from "../models/Ticket";

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
  ],
  controllers: [TicketController],
  providers: [TicketService]
})
export class TicketModule {}
