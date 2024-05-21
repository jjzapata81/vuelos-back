import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Seat } from "./seats.entity";
import { Ticket } from "./ticket.entity";


@Entity()
export class Flight {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {unique:true})
    code:string;

    @Column('text')
    from:string;

    @Column('text')
    to:string;

    @Column({type:'date'})
    departureDate:string;

    @Column({type:'time'})
    departureTime:string;

    @Column({type:'date'})
    arriveDate:string;

    @Column({type:'time'})
    arriveTime:string;

    @OneToMany(
        () => Seat, 
        seat => seat.flight,
        { cascade: true, eager:true }
    )
    seats?: Seat[];

    @OneToMany(
        () => Ticket,
        ticket => ticket.flight,
        { cascade:true, eager:true }
    )
    tickets?: Ticket[];

    @BeforeInsert()
    @BeforeUpdate()
    private before(){
        this.from = this.from.toLowerCase();
        this.to = this.to.toLowerCase();
    }

}
