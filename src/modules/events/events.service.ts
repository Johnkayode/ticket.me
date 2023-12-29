import { EventRepository, EventCategoryRepository } from './events.repository'
import { Event, EventCategory } from '../../database/entity/event.entity'


class EventCategoryService {
    repository = EventCategoryRepository

    async create(data: Omit<EventCategory, "id">) {
        let category = await this.repository.create(data)
        return this.repository.save(category)
    }

    async list(): Promise<EventCategory[]> {
        return this.repository.find()
    }

    async search(query: string): Promise<EventCategory[]> {
        return await this.repository
            .createQueryBuilder()
            .select()
            .where("name ILIKE :query", { query: `%${query}%` })
            .getMany();
    }
}


class EventService {
    repository = EventRepository

    async create(data: Omit<Event, "id">): Promise<Event> {
        let event = await this.repository.create(data);
        return this.repository.save(event);
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


export { EventService, EventCategoryService }