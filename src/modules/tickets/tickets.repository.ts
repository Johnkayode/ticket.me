import { AppDataSource } from '../../database/ormconfig';
import { Ticket, TicketType } from '../../database/entity/ticket.entity';

export const TicketRepository = AppDataSource.getRepository(Ticket);

export const TicketTypeRepository = AppDataSource.getRepository(TicketType);
