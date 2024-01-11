import { EventRepository, EventCategoryRepository } from './events.repository';
import { Event, EventCategory } from '../../database/entity/event.entity';
import { CreateEventDTO, CreateCategoryDTO } from './events.dto';
import { TicketTypeRepository } from '../tickets/tickets.repository';
import { CreateTicketDTO } from '../tickets/tickets.dto';
import { SchemaTextFieldPhonetics } from 'redis';

class EventCategoryService {
  repository = EventCategoryRepository;

  async create(data: CreateCategoryDTO) {
    let category = await this.repository.create(data);
    return this.repository.save(category);
  }

  async list(): Promise<EventCategory[]> {
    return this.repository.find();
  }

  async retrieve(id: string): Promise<EventCategory> {
    return this.repository.findOneBy({ id: id});
  }

  async search(query: string): Promise<EventCategory[]> {
    return await this.repository
      .createQueryBuilder()
      .select()
      .where('name ILIKE :query', { query: `%${query}%` })
      .getMany();
  }
}

class EventService {
  repository = EventRepository;
  categoryService = new EventCategoryService();

  async create(data: Omit<CreateEventDTO, "categories">): Promise<Event> {
   
    let event = await this.repository.create(data);
    
    event.ticketTypes = [];
    for (const ticketTypeData of data.ticketTypes) {
        let ticketType = await TicketTypeRepository.create(ticketTypeData);
        await TicketTypeRepository.save(ticketType); 
        event.ticketTypes.push(ticketType);
    }

    event.categories = [];
    // @ts-ignore
    for (const categoryId of data.categories) {
        let category = await this.categoryService.retrieve(categoryId);; 
        event.categories.push(category);
    }
 
    
    return this.repository.save(event);
  }

  async list({user = true, tickets = false}: {user?: boolean, tickets?: boolean}): Promise<Event[]> {
    return this.repository.find({
      relations: {
        user: user,
        tickets: tickets,
        ticketTypes: true,
        categories: true,
      },
    });
  }

  async retrieve(id: number): Promise<Event> {
    const events = await this.repository.find({
      where: { id: id },
      relations: {
        user: true,
        tickets: true,
        ticketTypes: true,
        categories: true,
      },
    });
    if (!events.length) {
      throw new Error('Event not found.');
    }
    return events[0];
  }

  async update(id: number, data: Partial<Event>) {
    const event = await this.repository.findOneBy({ id: id });
    if (!event) {
      throw new Error('Event not found.');
    }
    return await this.repository.update(id, data);
  }

  async search(query: string): Promise<Event[]> {
    return await this.repository
      .createQueryBuilder()
      .select()
      .where('name ILIKE :query', { query: `%${query}%` })
      .getMany();
    // .orWhere("description ILIKE :query", { query: `%${query}%` })
  }

  /**
   * This function generates a ticket for an event
   * @returns
   */
  async generateTicket(id: number, data: CreateTicketDTO) {}

}

export { EventService, EventCategoryService };
