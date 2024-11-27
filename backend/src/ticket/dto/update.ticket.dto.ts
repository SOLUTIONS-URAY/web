import {IsEnum, IsNotEmpty, IsNumber, IsNumberString, Min} from 'class-validator';
import {Column, CreateDateColumn, ManyToOne, OneToMany, UpdateDateColumn} from "typeorm";
import {TicketType} from "../../models/TicketType";
import {User} from "../../models/User";
import {TicketEvent} from "../../models/TicketEvent";
import {TicketPriority, TicketStatus} from "../../models/Ticket";
import {Type} from "class-transformer";

class UpdateTicketDtoNestedId {
    @IsNumber()
    id: number;
}

export class UpdateTicketDto {
    @IsNumber()
    id: number;

    @IsEnum(TicketPriority)
    priority: TicketPriority;

    @IsNotEmpty()
    title: string;

    @Type(()=> UpdateTicketDtoNestedId)
    type: UpdateTicketDtoNestedId;

    @Type(()=> UpdateTicketDtoNestedId)
    issuedUser: UpdateTicketDtoNestedId;

    @Type(()=> UpdateTicketDtoNestedId)
    assignedUser?:  UpdateTicketDtoNestedId;

    @IsEnum(TicketStatus)
    status: TicketStatus;
}