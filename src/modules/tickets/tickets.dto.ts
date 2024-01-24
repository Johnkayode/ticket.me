export interface CreateTicketTypeDTO {
  title: string;
  description?: string;
  amount: number;
}

export interface CreateTicketDTO {
  first_name: string;
  last_name: string;
  email: string;
  ticketType: string;
  eventId: string;
}
