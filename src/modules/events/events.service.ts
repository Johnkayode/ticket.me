import { EventRepository } from './events.repository'
import { Event } from '../../database/entity/event.entity'


export class EventService {
    repository = EventRepository

    async create(data: Omit<Event, "id">): Promise<Event> {
        let item = await this.repository.create(data);
        return this.repository.save(item);
    }

    async list(): Promise<Event[]> {
        return this.repository.find()
    }

    async retrieve(id: number): Promise<Event> {
        const event = await this.repository.findOneBy({ id: id });
        if (!event) {
            throw new Error("Event not found.");
        }
        return event
    }

    async update(id: number, data: Partial<Event>) {
        const event = await this.repository.findOneBy({ id: id });
        if (!event) {
            throw new Error("Event not found.");
        }
        return await this.repository.update(id, data)
    }

    async search(query: string): Promise<Event[]> {
        return await this.repository
            .createQueryBuilder()
            .select()
            .where("name ILIKE :query", { query: `%${query}%` })
            .getMany();
            // .orWhere("description ILIKE :query", { query: `%${query}%` })
    }
}