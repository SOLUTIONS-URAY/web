import {BadRequestException, Body, Controller, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {TicketService} from "./ticket.service";
import {GetTicketDto} from "./dto/get.ticket.dto";
import {UpdateTicketDto} from "./dto/update.ticket.dto";
import {AuthGuard} from "../auth/auth.guard";
import {CommentTicketDto} from "./dto/comment.ticket.dto";


@Controller('ticket')
export class TicketController {
    constructor(private ticketService: TicketService) {}

    @Get("")
    async list() {
        return await this.ticketService.list();
    }

    @Get("types")
    async getTicketTypes() {
        return await this.ticketService.getTicketTypes();
    }

    @Post("/:id/comment")
    @UseGuards(AuthGuard)
    async comment(@Param() params: GetTicketDto, @Body() body: CommentTicketDto, @Req() req) {
        return await this.ticketService.comment(body.text, req.user.id, params.id);
    }

    @Get("/:id/")
    async get(@Param() params: GetTicketDto) {
        return await this.ticketService.get(params.id);
    }

    @Put("/:id/")
    @UseGuards(AuthGuard)
    async update(@Param() params: GetTicketDto, @Body() body: UpdateTicketDto, @Req() req) {
        if (params.id != body.id) throw new BadRequestException("ID in param and ID in body are different");

        return await this.ticketService.update(body, req.user.id);
    }

}
