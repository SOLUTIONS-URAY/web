import {IsEnum, IsNotEmpty, IsNumber} from 'class-validator';
import {TicketPriority, TicketStatus} from '../../models/Ticket';
import {Type} from 'class-transformer';

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

  @Type(() => UpdateTicketDtoNestedId)
  type: UpdateTicketDtoNestedId;

  @Type(() => UpdateTicketDtoNestedId)
  issuedUser: UpdateTicketDtoNestedId;

  @Type(() => UpdateTicketDtoNestedId)
  assignedUser?: UpdateTicketDtoNestedId;

  @IsEnum(TicketStatus)
  status: TicketStatus;
}
