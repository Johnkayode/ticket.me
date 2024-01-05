import { EventCategory } from 'database/entity/event.entity';
import { Currency } from 'database/entity/event.enum';
import { TicketType } from 'database/entity/ticket.entity';
import { TicketTypeDTO } from 'modules/tickets/tickets.dto';

export interface CreateCategoryDTO {
  name: string;
}

export interface CategoryDTO {
  id: string;
  name: string;
}

export interface CreateEventDTO {
  name: string;
  description?: string;
  categories: CreateCategoryDTO[];
  ticketTypes: TicketTypeDTO[];
  fromDate: Date;
  toDate: Date;
  venue: string;
  maxParticipants?: number;
  is_free?: boolean;
  currency?: Currency;
}

export interface EventDTO {
  name: string;
  description: string;
  categories: CategoryDTO[];
  ticketTypes: TicketTypeDTO[];
  fromDate: Date;
  toDate: Date;
  venue: string;
  is_free: boolean;
  currency: Currency;
}
