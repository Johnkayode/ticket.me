import { AppDataSource } from '../../database/ormconfig'
import { Ticket } from '../../database/entity/ticket.entity'


export const TicketRepository = AppDataSource.getRepository(Ticket)