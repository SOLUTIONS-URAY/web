import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, EntityManager, Repository} from "typeorm";
import {Ticket, TicketPriority} from "../models/Ticket";
import {TicketEvent, TicketEventType} from "../models/TicketEvent";
import {User} from "../models/User";
import {UpdateTicketDto} from "./dto/update.ticket.dto";

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(Ticket)
        private ticketsRepository: Repository<Ticket>,
        @InjectRepository(TicketEvent)
        private ticketEventsRepository: Repository<TicketEvent>,
        private dataSource: DataSource,
    ) {
    }

    async list() {
        return await this.ticketsRepository.find({
            select: {
                id: true,
                priority: true,
                title: true,
                type: {
                    id: true,
                    name: true
                },
                issuedUser: {
                    fullName: true,
                    email: true,
                },
                assignedUser: {
                    fullName: true,
                    email: true,
                },
                created_at: true,
                status: true
            },
            relations: {
                issuedUser: true,
                assignedUser: true,
                type: true
            }
        })
    }

    async get(id: number) {
        const ticket = await this.ticketsRepository.findOne({
            where: {
                id
            },
            select: {
                id: true,
                priority: true,
                title: true,
                type: {
                    id: true,
                    name: true
                },
                issuedUser: {
                    fullName: true,
                    email: true,
                },
                assignedUser: {
                    fullName: true,
                    email: true,
                },
                created_at: true,
                status: true
            },
            relations: {
                issuedUser: true,
                assignedUser: true,
                type: true,
                events: true
            }
        })

        const events = await this.ticketEventsRepository.find({
            where: {
                ticket:{
                    id: ticket.id
                }
            },
            select: {
                type: true,
                message: true,
                author: {
                    fullName: true
                }
            },
            relations: {
                author: true
            }
        })


        if (ticket === null) throw new NotFoundException("Ticket с указанным ID не найден")
        return {
            ...ticket,
            events
        };
    }

    async changePriority(manager: EntityManager, newPriority: TicketPriority, userId: number, id: number) {
        const ticket = await manager.findOne(Ticket, {
            where: {id},
            select: {
                id: true,
                priority: true,
                events: {
                    uuid: true,
                    author: {
                        fullName: true
                    }
                }
            },
            relations: {
                events: true
            }
        });
        const lastValue = ticket.priority;
        ticket.priority = newPriority;

        const user = await manager.findOne(User, {
            where: {id: userId}
        })

        const event = new TicketEvent();
        event.type = TicketEventType.CHANGE_PRIORITY;
        event.message = "c "+lastValue+" на "+newPriority;
        event.ticket = ticket;
        event.author = user;

        await manager.save(ticket);
        await manager.save(event);

        return ticket;
    }

    async update(newTicket: UpdateTicketDto, userId: number) {
        return await this.dataSource.transaction(async manager => {
            let ticket = await this.ticketsRepository.findOneBy({id: newTicket.id});

            if (ticket.priority !== newTicket.priority) {
                console.log("abgr")
                ticket = await this.changePriority(manager, newTicket.priority, userId, ticket.id)
            }
            return ticket;
        });

    }
}
