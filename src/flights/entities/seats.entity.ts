import { SeatState } from "src/enums/seat-state.enum";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Flight } from "./flight.entity";
import { Ticket } from "./ticket.entity";


@Entity()
export class Seat{

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    code: string;

    @Column('text')
    classType: string;

    @Column({
        type: 'enum',
        enum: [SeatState.AVAILABLE, SeatState.RESERVED, SeatState.PURCHASED],
        default: SeatState.AVAILABLE
    })
    state: SeatState;

    @ManyToOne(
        () => Flight,
        flight => flight.seats,
        
    )
    flight: Flight;
}