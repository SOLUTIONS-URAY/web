import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {TicketEvent} from './TicketEvent';
import {Ticket} from './Ticket';
import {Organization} from './Organization';

export enum UserRole {
  SYS_ADMIN,
  ORG_OWNER,
  ORG_SUPPORT,
  ORG_MASTER,
  ORG_USER,
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({type: 'enum', enum: UserRole})
  userRole: UserRole;

  @OneToMany(() => Ticket, (ticket) => ticket.issuedUser)
  issuedTickets: Ticket[];

  @OneToMany(() => Ticket, (ticket) => ticket.assignedUser)
  assignedTickets: Ticket[];

  @Column()
  isActive: boolean;

  @OneToMany(() => TicketEvent, (ticket_event) => ticket_event.author)
  ticket_events: TicketEvent[];

  @ManyToOne(() => Organization, (organization) => organization.users, {
    nullable: true,
  })
  organization: Organization;
}
