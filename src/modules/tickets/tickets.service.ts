import { TicketRepository } from './tickets.repository'
import { Ticket } from '../../database/entity/ticket.entity'


export class EventService {
    repository = TicketRepository

    async create(data: Omit<Ticket, "id">): Promise<Ticket> {
        let item = await this.repository.create(data);
        return this.repository.save(item);
    }

    async list(): Promise<Ticket[]> {
        return this.repository.find()
    }

    async retrieve(reference: string): Promise<Ticket> {
        const event = await this.repository.findOneBy({ reference: reference });
        if (!event) {
            throw new Error("Ticket not found.");
        }
        return event
    }

    async update(id: number, data: Partial<Ticket>) {
        const event = await this.repository.findOneBy({ id: id });
        if (!event) {
            throw new Error("Ticket not found.");
        }
        return await this.repository.update(id, data)
    }

}