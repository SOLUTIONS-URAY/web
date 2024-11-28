import {IsNumberString} from 'class-validator';

export class GetTicketDto {
  @IsNumberString()
  id: number;
}
