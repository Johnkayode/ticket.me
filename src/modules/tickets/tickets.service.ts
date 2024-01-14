import { TicketRepository, TicketTypeRepository } from './tickets.repository';
import { Ticket, TicketType } from '../../database/entity/ticket.entity';
import { CreateTicketDTO } from './tickets.dto';

export class TicketService {
  repository = TicketRepository;

  async create(data: Partial<Ticket>): Promise<Ticket> {
    let item = await this.repository.create(data);
    return this.repository.save(item);
  }

  async list(): Promise<Ticket[]> {
    return this.repository.find();
  }

  async retrieve(reference: string): Promise<Ticket> {
    const event = await this.repository.findOneBy({ reference: reference });
    if (!event) {
      throw new Error('Ticket not found.');
    }
    return event;
  }

  async update(id: number, data: Partial<Ticket>) {
    const event = await this.repository.findOneBy({ id: id });
    if (!event) {
      throw new Error('Ticket not found.');
    }
    return await this.repository.update(id, data);
  }

  async verifyTicket(data: string, event: Event) {
    // check if ticket exists
    let [uid, reference] = data.split('_');
    if (!uid || !reference) {
      return [null, 'Invalid ticket data format'];
    }

    // verify ticket with qrcode
  }

  async generateQrCode(ticket: Ticket) {
    // generate qrcode
    let data = `${ticket.id}_${ticket.reference}`;
    let qrcode = data;
    ticket.qrcode = qrcode;

    // save to db
  }

  async generateTicketPdf(ticket: Ticket) {
    // generate pdf using qrcode
    let ticketPdf = ticket.qrcode;
    ticket.pdf = ticketPdf;

    // save to db
  }
}

export class TicketTypeService {
    repository = TicketTypeRepository;
  
    async create(data: Partial<TicketType>): Promise<TicketType> {
      let item = await this.repository.create(data);
      return this.repository.save(item);
    }
  
    async list(): Promise<TicketType[]> {
      return this.repository.find();
    }
  
    async retrieve(id: string): Promise<TicketType> {
      const event = await this.repository.findOneBy({ id: id });
      if (!event) {
        throw new Error('Ticket Type not found.');
      }
      return event;
    }
}  


