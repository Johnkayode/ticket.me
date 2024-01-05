import { EventCategory } from 'database/entity/event.entity';
import { Currency } from 'database/entity/event.enum';
import { TicketType } from 'database/entity/ticket.entity';

export interface CreateEventDTO {
  name: string;
  description?: string;
  categories: EventCategory[];
  ticketTypes: TicketType[];
  fromDate: Date;
  toDate: Date;
  venue: string;
  maxParticipants?: number;
  is_free?: boolean;
  currency?: Currency;
}

export interface CreateCategoryDTO {
  name: string;
}
