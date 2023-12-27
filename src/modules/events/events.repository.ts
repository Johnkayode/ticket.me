import { AppDataSource } from '../../database/ormconfig'
import { Event } from '../../database/entity/event.entity'


export const EventRepository = AppDataSource.getRepository(Event)