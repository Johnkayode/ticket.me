import { EventDTO } from '../events/events.dto';

export interface TicketTypeDTO {
  title: string;
  description: string;
  amount: number;
}

export interface TicketDTO {
  id: string;
  event: EventDTO;
  ticketType: TicketTypeDTO;
  reference: string;
  firstName: string;
  lastName: string;
  email: string;
  qrcode: string;
  pdf: string;
}
