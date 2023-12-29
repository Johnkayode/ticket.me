import { AppDataSource } from '../../database/ormconfig'
import { Event, EventCategory } from '../../database/entity/event.entity'


const EventRepository = AppDataSource.getRepository(Event)
const EventCategoryRepository = AppDataSource.getRepository(EventCategory)

export { EventRepository, EventCategoryRepository }