import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DataSource, EntityManager, Repository} from 'typeorm';
import {Ticket, TicketPriority, TicketStatus} from '../models/Ticket';
import {TicketEvent, TicketEventType} from '../models/TicketEvent';
import {User, UserRole} from '../models/User';
import {UpdateTicketDto} from './dto/update.ticket.dto';
import {TicketType} from '../models/TicketType';
import {CreateTicketDto} from './dto/create.ticket.dto';
import {RedisService} from "../redis/redis.service";

const TICKET_STATUS_NAMES = [
  'Не назначено',
  'В работе',
  'Ожидание клиента',
  'Требуется ответ',
  'Закрыто',
];
const TICKET_PRIORITY_NAMES = ['Не назначен', 'Низкий', 'Средний', 'Высокий'];

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
    private redisService: RedisService,
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
          name: true,
        },
        issuedUser: {
          id: true,
          fullName: true,
          email: true,
        },
        assignedUser: {
          id: true,
          fullName: true,
          email: true,
        },
        created_at: true,
        status: true,
      },
      relations: {
        issuedUser: true,
        assignedUser: true,
        type: true,
      },
    });
  }

  async get(id: number) {
    const ticket = await this.ticketsRepository.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        priority: true,
        title: true,
        type: {
          id: true,
          name: true,
        },
        issuedUser: {
          id: true,
          fullName: true,
          email: true,
        },
        assignedUser: {
          id: true,
          fullName: true,
          email: true,
        },
        created_at: true,
        status: true,
      },
      relations: {
        issuedUser: true,
        assignedUser: true,
        type: true,
        events: true,
      },
    });

    const events = await this.ticketEventsRepository.find({
      where: {
        ticket: {
          id: ticket.id,
        },
      },
      select: {
        uuid: true,
        type: true,
        message: true,
        created_at: true,
        author: {
          fullName: true,
        },
      },
      relations: {
        author: true,
      },
      order: {
        created_at: 'ASC',
      },
    });

    if (ticket == null)
      throw new NotFoundException('Ticket с указанным ID не найден');
    return {
      ...ticket,
      events,
    };
  }

  async changePriority(
    manager: EntityManager,
    newPriority: TicketPriority,
    user: User,
    id: number,
  ) {
    const ticket = await manager.findOneBy(Ticket, {id});
    const lastValue = ticket.priority;
    ticket.priority = newPriority;

    const event = new TicketEvent();
    event.type = TicketEventType.CHANGE_PRIORITY;
    event.message =
      "c '" +
      TICKET_PRIORITY_NAMES[lastValue] +
      "' на '" +
      TICKET_PRIORITY_NAMES[newPriority] +
      "'";
    event.ticket = ticket;
    event.author = user;

    await manager.save(ticket);
    await manager.save(event);

    return ticket;
  }

  async changeTitle(
    manager: EntityManager,
    newTitle: string,
    user: User,
    id: number,
  ) {
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

    await this.sendToRedis(event);

    return ticket;
  }

  async changeStatus(
    manager: EntityManager,
    newStatus: number,
    user: User,
    id: number,
  ) {
    const ticket = await manager.findOneBy(Ticket, {id});
    const lastValue = ticket.status;
    ticket.status = newStatus;

    const event = new TicketEvent();
    event.type = TicketEventType.CHANGE_STATUS;
    event.message =
      "c '" +
      TICKET_STATUS_NAMES[lastValue] +
      "' на '" +
      TICKET_STATUS_NAMES[newStatus] +
      "'";
    event.ticket = ticket;
    event.author = user;

    await manager.save(ticket);
    await manager.save(event);

    await this.sendToRedis(event);

    return ticket;
  }

  async changeType(
    manager: EntityManager,
    newTypeId: number,
    user: User,
    id: number,
  ) {
    const ticket = await manager.findOne(Ticket, {
      where: {id},
      relations: {type: true},
    });
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

    await this.sendToRedis(event);

    return ticket;
  }

  async changeAssignedUser(
    manager: EntityManager,
    newAssignedUserId: number,
    user: User,
    id: number,
  ) {
    const ticket = await manager.findOne(Ticket, {
      where: {id},
      relations: {assignedUser: true},
    });
    const newAssignedUser = await manager.findOneBy(User, {
      id: newAssignedUserId,
    });
    if (newAssignedUser.userRole !== UserRole.ORG_MASTER)
      throw new BadRequestException(
        'Указанный пользователь не является специалистом',
      );

    const lastValue = ticket.assignedUser;
    ticket.assignedUser = newAssignedUser;

    const event = new TicketEvent();
    event.type = TicketEventType.CHANGE_ASSIGNED_USER;
    if (lastValue) {
      event.message =
        "c '" + lastValue.fullName + "' на '" + newAssignedUser.fullName + "'";
    } else {
      event.message =
        "c 'Не назначен' на '" + newAssignedUser.fullName + "'";
    }
    event.ticket = ticket;
    event.author = user;

    await manager.save(ticket);
    await manager.save(event);

    await this.sendToRedis(event);

    return ticket;
  }

  async update(newTicket: UpdateTicketDto, userId: number) {
    await this.dataSource.transaction(async (manager) => {
      const ticket = await manager.findOne(Ticket, {
        where: {
          id: newTicket.id,
        },
        relations: {
          type: true,
          assignedUser: true,
        },
      });
      const user = await manager.findOne(User, {
        where: {id: userId},
      });

      if (!ticket)
        throw new BadRequestException('Ticket с указанным ID не найден');
      if (!user)
        throw new BadRequestException('Пользователь с указанным ID не найден');

      if (ticket.priority !== newTicket.priority) {
        if (user.userRole !== 0)
          throw new BadRequestException(
            'У пользователя нет прав на изменение приоритета',
          );
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
      if (newTicket.assignedUser) {
        if (ticket.assignedUser?.id !== newTicket.assignedUser.id) {
          await this.changeAssignedUser(
            manager,
            newTicket.assignedUser.id,
            user,
            ticket.id,
          );
        }
      }
    });

    return await this.ticketsRepository.findOneBy({id: newTicket.id});
  }

  async comment(msg: string, userId: number, id: number) {
    const user = await this.dataSource.manager.findOne(User, {
      where: {id: userId},
    });
    const ticket = await this.ticketsRepository.findOne({
      where: {
        id,
      },
    });

    const event = new TicketEvent();
    event.type = TicketEventType.ADD_COMMENTARY;
    event.message = msg;
    event.ticket = ticket;
    event.author = user;

    await event.save();
    return {
      result: 'ok',
    };
  }

  async create(newTicket: CreateTicketDto) {
    return await this.dataSource.transaction(async (manager) => {
      let user = await manager.findOne(User, {
        where: {email: newTicket.email},
      });
      if (!user) {
        user = new User();
        user.fullName = 'Не указан';
        user.userRole = UserRole.ORG_USER;
        user.email = newTicket.email;
        user.isActive = false;
        user.password = '';
        user.organization = null;
        await manager.save(user);
      }

      const ticket_type = await manager.findOne(TicketType, {
        where: {id: newTicket.typeId},
      });
      if (!ticket_type)
        throw new BadRequestException('Тип заявки с таким ID не найден');

      const ticket = new Ticket();
      ticket.title = newTicket.title;
      ticket.status = TicketStatus.NOT_ASSIGNED;
      ticket.priority = TicketPriority.NONE;
      ticket.issuedUser = user;
      ticket.type = ticket_type;
      await manager.save(ticket);

      const firstEvent = new TicketEvent();
      firstEvent.ticket = ticket;
      firstEvent.author = user;
      firstEvent.type = TicketEventType.ADD_COMMENTARY;
      firstEvent.message = newTicket.text;
      await manager.save(firstEvent);

      return ticket;
    });
  }

  async sendToRedis(event: TicketEvent) {
    const ticket = await this.ticketsRepository.findOne({
      where: {
        id: event.ticket.id
      },
      select: {
        id:true,
        priority: true,
        title: true,
        created_at: true,
        status: true,
        issuedUser: {
          id: true,
          fullName: true,
          email: true,
        },
        assignedUser: {
          id: true,
          fullName: true,
          email: true,
        },
        type: {
          id: true,
          name: true
        }
      },
      relations: {
        issuedUser: true,
        assignedUser: true,
        type: true,
      }
    });
    this.redisService.pubUpdate(JSON.stringify({
      ...event, ticket
    }))
  }

}
