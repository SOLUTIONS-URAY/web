import {BadRequestException, Body, Controller, Get, Param, Put, Req, UseGuards} from '@nestjs/common';
import {TicketService} from "./ticket.service";
import {GetTicketDto} from "./dto/get.ticket.dto";
import {UpdateTicketDto} from "./dto/update.ticket.dto";
import {AuthGuard} from "../auth/auth.guard";


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

    @Put("/:id")
    @UseGuards(AuthGuard)
    async update(@Param() params: GetTicketDto, @Body() body: UpdateTicketDto, @Req() req) {
        if (params.id != body.id) throw new BadRequestException("ID in param and ID in body are different");

        return await this.ticketService.update(body, req.user.id);
    }
}
