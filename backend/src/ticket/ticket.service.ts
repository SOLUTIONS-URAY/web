import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Ticket} from "../models/Ticket";

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(Ticket)
        private ticketsRepository: Repository<Ticket>,
    ) {}

    async list(){
        return await this.ticketsRepository.find({
            select:{
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
            relations:{
                issuedUser: true,
                assignedUser: true,
                type: true
            }
        })
    }

    async get(id: number){
        const ticket =  await this.ticketsRepository.findOne({
            where:{
                id
            },
            select:{
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
                events: {
                    type: true,
                    message: true,
                    author: {
                        id: true,
                        fullName: true
                    },
                },
                created_at: true,
                status: true
            },
            relations:{
                issuedUser: true,
                assignedUser: true,
                type: true,
                events: true
            }
        })

        if (ticket === null) throw new NotFoundException("Ticket с указанным ID не найден")
        return ticket;
    }
}
