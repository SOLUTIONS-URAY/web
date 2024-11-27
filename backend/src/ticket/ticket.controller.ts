import {Controller, Get, Param} from '@nestjs/common';
import {TicketService} from "./ticket.service";
import {GetTicketDto} from "./dto/get.ticket.dto";

@Controller('ticket')
export class TicketController {
    constructor(private ticketService: TicketService) {}

    @Get("")
    async list() {
        return await this.ticketService.list();
    }

    @Get("/:id")
    async get(@Param() params: GetTicketDto) {
        return await this.ticketService.get(params.id);
    }
}
