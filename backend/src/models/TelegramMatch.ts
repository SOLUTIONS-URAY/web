import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./User";

@Entity()
export class TelegramMatch extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    telegramId: string;

    @Column()
    telegramUsername: string;

    @OneToOne(()=>User, (user)=> user.telegramMatch)
    @JoinColumn()
    user: User;
}
