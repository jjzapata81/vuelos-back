import { User } from "src/auth/entities/user.entity";
import { TicketState } from "src/enums/ticket-state.enum";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Flight } from "./flight.entity";
import { TicketType } from "src/enums/ticket-type.enum";

@Entity()
export class Ticket {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal')
    price: number;

    @Column({
        type: 'enum',
        enum: [TicketType.BASIC, TicketType.LIGHT, TicketType.FULL],
        default: TicketType.BASIC
    })
    ticketType: TicketType;

    @Column({
        type:'enum',
        enum: [TicketState.RESERVED, TicketState.PAID]
    })
    state: TicketState;

    @ManyToOne(
        () => User,
        user => user.tickets
    )
    user: User;

    @ManyToOne(
        () => Flight,
        flight => flight.tickets
    )
    flight: Flight;

}