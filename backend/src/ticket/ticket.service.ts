import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, EntityManager, Repository} from "typeorm";
import {Ticket, TicketPriority} from "../models/Ticket";
import {TicketEvent, TicketEventType} from "../models/TicketEvent";
import {User} from "../models/User";
import {UpdateTicketDto} from "./dto/update.ticket.dto";
import {TicketType} from "../models/TicketType";

const TICKET_STATUS_NAMES = [
    'Не назначено',
    'В работе',
    'Ожидание клиента',
    'Требуется ответ',
    'Закрыто'
];
const TICKET_PRIORITY_NAMES = [
    'Не назначен',
    'Низкий',
    'Средний',
    'Высокий'
];

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(Ticket)
        private ticketsRepository: Repository<Ticket>,
        @InjectRepository(TicketEvent)
        private ticketEventsRepository: Repository<TicketEvent>,
        @InjectRepository(TicketType)
        private ticketTypesRepository: Repository<TicketType>,
        private dataSource: DataSource,
    ) {
    }

    async getTicketTypes() {
        return await this.ticketTypesRepository.find();
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
                uuid: true,
                type: true,
                message: true,
                created_at: true,
                author: {
                    fullName: true
                }
            },
            relations: {
                author: true
            },
            order: {
                created_at: "ASC"
            }
        })


        if (ticket == null) throw new NotFoundException("Ticket с указанным ID не найден")
        return {
            ...ticket,
            events
        };
    }

    async changePriority(manager: EntityManager, newPriority: TicketPriority, user: User, id: number) {
        const ticket = await manager.findOneBy(Ticket, {id});
        const lastValue = ticket.priority;
        ticket.priority = newPriority;

        const event = new TicketEvent();
        event.type = TicketEventType.CHANGE_PRIORITY;
        event.message = "c '" + TICKET_PRIORITY_NAMES[lastValue] + "' на '" + TICKET_PRIORITY_NAMES[newPriority] + "'";
        event.ticket = ticket;
        event.author = user;

        await manager.save(ticket);
        await manager.save(event);

        return ticket;
    }

    async changeTitle(manager: EntityManager, newTitle: string, user: User, id: number) {
        const ticket = await manager.findOneBy(Ticket, {id});
        const lastValue = ticket.title;
        ticket.title = newTitle;

        const event = new TicketEvent();
        event.type = TicketEventType.CHANGE_TITLE;
        event.message = "c '" + lastValue + "' на '" + newTitle + "'";
        event.ticket = ticket;
        event.author = user;

        await manager.save(ticket);
        await manager.save(event);

        return ticket;
    }

    async changeStatus(manager: EntityManager, newStatus: number, user: User, id: number) {
        const ticket = await manager.findOneBy(Ticket, {id});
        const lastValue = ticket.status;
        ticket.status = newStatus;

        const event = new TicketEvent();
        event.type = TicketEventType.CHANGE_STATUS;
        event.message = "c '" + TICKET_STATUS_NAMES[lastValue] + "' на '" + TICKET_STATUS_NAMES[newStatus] + "'";
        event.ticket = ticket;
        event.author = user;

        await manager.save(ticket);
        await manager.save(event);

        return ticket;
    }

    async changeType(manager: EntityManager, newTypeId: number, user: User, id: number) {
        const ticket = await manager.findOne(Ticket, {where: {id}, relations: {type: true}});
        const newType = await manager.findOneBy(TicketType, {id: newTypeId});
        const lastValue = ticket.type;
        ticket.type = newType;

        const event = new TicketEvent();
        event.type = TicketEventType.CHANGE_TYPE;
        event.message = "c '" + lastValue.name + "' на '" + newType.name + "'";
        event.ticket = ticket;
        event.author = user;

        await manager.save(ticket);
        await manager.save(event);

        return ticket;
    }

    async update(newTicket: UpdateTicketDto, userId: number) {
        await this.dataSource.transaction(async manager => {
            let ticket = await this.ticketsRepository.findOne({
                where: {
                    id: newTicket.id
                },
                relations: {
                    type: true
                }
            });
            const user = await this.dataSource.manager.findOne(User, {
                where: {id: userId}
            })

            if (!ticket) throw new BadRequestException("Ticket с указанным ID не найден");
            if (!user) throw new BadRequestException("Пользователь с указанным ID не найден");

            if (ticket.priority !== newTicket.priority) {
                if (user.userRole !== 0) throw new BadRequestException("У пользователя нет прав на изменение приоритета");
                await this.changePriority(manager, newTicket.priority, user, ticket.id);
            }
            if (ticket.title !== newTicket.title) {
                await this.changeTitle(manager, newTicket.title, user, ticket.id);
            }
            if (ticket.status !== newTicket.status) {
                await this.changeStatus(manager, newTicket.status, user, ticket.id);
            }
            if (ticket.type.id !== newTicket.type.id) {
                await this.changeType(manager, newTicket.type.id, user, ticket.id);
            }

        });

        return await this.ticketsRepository.findOneBy({id: newTicket.id});
    }

    async comment(msg: string, userId: number, id: number) {
        const user = await this.dataSource.manager.findOne(User, {
            where: {id: userId}
        })
        let ticket = await this.ticketsRepository.findOne({
            where: {
                id
            }
        });

        const event = new TicketEvent();
        event.type = TicketEventType.ADD_COMMENTARY;
        event.message = msg;
        event.ticket = ticket;
        event.author = user;

        await event.save();
        return {
            result: "ok"
        }
    }
}
