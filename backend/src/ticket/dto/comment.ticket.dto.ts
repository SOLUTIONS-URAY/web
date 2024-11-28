import {IsString, MaxLength, MinLength, NotContains} from "class-validator";

export class CommentTicketDto {
    @IsString()
    @MinLength(3)
    @MaxLength(1024)
    @NotContains("script")
    text: string;
}