import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    ManyToOne,
} from "typeorm"
import { BaseProps } from "../../common/common.entity"
import { Event } from "../../modules/events/event.entity"


@Entity()
export class Ticket extends BaseProps {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @ManyToOne( () => Event, (event) => event.tickets, { onDelete: 'SET NULL', nullable: true })
    event: Event

    @Column({ type: "varchar", length: 255, nullable: false , unique: true })
    reference: string

    @Column({ type: "varchar", length: 255, nullable: false })
    first_name: string

    @Column({ type: "varchar", length: 255, nullable: true })
    last_name: string

    @Column({ type: "varchar", length: 255, nullable: false, unique: true })
    email: string

    @Column({ nullable: true })
    qrcode: string

    @Column({ nullable: true })
    pdf: string

    @Column({ type: "boolean", default: false })
    is_expired: boolean

    static async verifyTicket(data: string, event: Event) {
        // check if ticket exists
        let [uid, reference] = data.split("_")
        if (!uid || !reference) {
            return [null, 'Invalid ticket data format'];
        }
        

        // verify ticket with qrcode
    }

    async generateQrCode() {
        // generate qrcode
        let data = `${this.id}_${this.reference}`
        let qrcode = data;
        this.qrcode = qrcode

        // save to db
    }

    async generateTicketPdf() {
        // generate pdf using qrcode
        let ticketPdf = this.qrcode
        this.pdf = ticketPdf

        // save to db

    }

}