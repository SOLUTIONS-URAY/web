import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {User} from './User';
import {Ticket} from './Ticket';

export enum TicketEventType {
    CHANGE_PRIORITY,
    CHANGE_TITLE,
    CHANGE_ISSUED_USER,
    CHANGE_ASSIGNED_USER,
    CHANGE_STATUS,
    CHANGE_TYPE,
    ADD_COMMENTARY,
}

@Entity()
export class TicketEvent extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({type: 'enum', enum: TicketEventType})
    type: TicketEventType;

    @Column({type: 'varchar', length: 1024})
    message: string;

    @ManyToOne(() => User, (user) => user.ticket_events)
    @JoinTable()
    author: User;

    @ManyToOne(() => Ticket, (ticket) => ticket.events)
    ticket: Ticket;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    created_at: Date;
}
