import { Ticket } from "src/flights/entities/ticket.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        unique:true,
    })
    email: string;

    @Column('text')
    name: string;

    @Column('text')
    password: string;

    @Column({default:true})
    isActive: boolean;

    @Column({
        type: 'enum',
        array: true,
        enum: ['admin', 'user'],
        default: ['user']
    })
    roles: UserRole[];

    @OneToMany(
        () => Ticket,
        ticket => ticket.user,
        { cascade:true }
    )
    tickets?: Ticket[];
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}
