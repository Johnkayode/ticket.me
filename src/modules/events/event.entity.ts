import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    OneToMany,
} from "typeorm"
import { BaseProps } from "../../common/common.entity"
import { Ticket } from "../../modules/tickets/ticket.entity"

@Entity()
export class Event extends BaseProps {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column({ 
        type: "varchar", 
        nullable: false,
        length: 255
    })
    name: string

    @Column({ type: "text", nullable: true })
    description: string

    @Column({ type: "timestamptz", nullable: false })
    fromDate: Date

    @Column({ type: "timestamptz", nullable: false })
    toDate: Date

    @Column({ type: "text" })
    venue: string

    @Column( { type: "int", nullable: true } )
    max_participants?: number

    @Column({ type: "boolean", default: false })
    is_closed: boolean

    @Column({ type: "boolean", default: false })
    is_cancelled: boolean 

    @Column({ type: "boolean", default: false })
    is_free: boolean

     
    @OneToMany(() => Ticket, (ticket) => ticket.event)
    tickets: Ticket[]

}