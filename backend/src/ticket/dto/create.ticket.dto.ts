import {IsEmail, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateTicketDto {
    @IsNumber()
    typeId: number;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    text: string;

    @IsString()
    @IsNotEmpty()
    title: string;
}
