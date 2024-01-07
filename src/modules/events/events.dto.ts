import { EventCategory } from 'database/entity/event.entity';
import { Currency } from 'database/entity/event.enum';
import { TicketType } from 'database/entity/ticket.entity';
import { CreateTicketTypeDTO } from 'modules/tickets/tickets.dto';

export interface CreateCategoryDTO {
  name: string;
}

export interface CategoryDTO {
  id: string;
}

export interface CreateEventDTO {
  name: string;
  description?: string;
  categories: CreateCategoryDTO[];
  ticketTypes: CreateTicketTypeDTO[];
  fromDate: Date;
  toDate: Date;
  venue: string;
  maxParticipants?: number;
  is_free?: boolean;
  currency?: Currency;
}
