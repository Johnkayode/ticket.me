import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    ManyToOne,
} from "typeorm"

import { Event } from "../../modules/events/event.entity"


@Entity()
export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @ManyToOne( () => Event, (event) => event.tickets)
    event: Event

    @Column()
    reference: string

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    email: string

    @Column()
    qrcode: string

    @Column()
    pdf: string

    @Column()
    is_expired: boolean

}