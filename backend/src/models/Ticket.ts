import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import {User} from "./User";
import {TicketEvent} from "./TicketEvent";
import {TicketType} from "./TicketType";

export enum TicketPriority {
    NONE,
    LOW,
    MEDIUM,
    HIGH
}

export enum TicketStatus {
    PROCESSING,
    WORKING,
    WAITING_RESPONSE,
    CLOSED
}

@Entity()
export class Ticket extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: TicketPriority,
        default: TicketPriority.NONE
    })
    priority: TicketPriority;

    @Column()
    title: string;

    @ManyToOne(()=>TicketType)
    type: TicketType;

    @OneToMany(() => User, (user) => user.issuedTickets)
    issuedUser: User;

    @OneToMany(() => User, (user) => user.issuedTickets, {nullable: true})
    assignedUser?: User;

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    updated_at: Date;

    @Column({type: "enum", enum: TicketStatus})
    status: TicketStatus;

    @OneToMany(() => TicketEvent, (ticket_event) => ticket_event.ticket)
    events: TicketEvent[];

    static async createTicket(title: string, ){
        const ticket = new Ticket();

    }
}