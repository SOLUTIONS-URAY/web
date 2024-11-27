import {IsNumberString, Min} from 'class-validator';

export class GetTicketDto {
    @IsNumberString()
    id: number;
}