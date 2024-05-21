import { IsNumber, IsEnum, IsString, IsEmail } from "class-validator";
import { TicketType } from "src/enums/ticket-type.enum";

export class TicketDto{

    @IsNumber({maxDecimalPlaces: 2})
    price: number;

    @IsEnum(TicketType)
    ticketType: TicketType;

    @IsEmail()
    email: string;

    @IsString()
    seatCode:string;

}