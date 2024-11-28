import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {User} from './User';

@Entity()
export class Organization extends BaseEntity {
    @PrimaryGeneratedColumn()
    uuid: number; // TODO: надо будет изменить на id, но мне лень делать миграцию

    @Column()
    name: string;

    @OneToOne(() => User)
    @JoinTable()
    owner: User;

    @OneToMany(() => User, (user) => user.organization)
    users: User[];
}
