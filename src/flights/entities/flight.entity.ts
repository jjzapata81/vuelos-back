import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Flight {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    from:string;

    @Column('text')
    to:string;

}
