import { AppDataSource } from '../../database/ormconfig';
import { Event, EventCategory } from '../../database/entity/event.entity';
import { TicketType } from 'database/entity/ticket.entity';

const EventRepository = AppDataSource.getRepository(Event);
const EventCategoryRepository = AppDataSource.getRepository(EventCategory);


export { EventRepository, EventCategoryRepository };
