import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

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
        enum: [UserRole.ADMIN, UserRole.USER],
        default: [UserRole.USER]
    })
    roles: UserRole[];
}

