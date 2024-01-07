import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseProps } from '../../common/common.entity';
import { Event } from './event.entity';

@Entity()
export class TicketType extends BaseProps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Event, (event) => event.ticketTypes, { onDelete: 'SET NULL', nullable: true })
  event: Event;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'float', nullable: false })
  amount: number;

  @OneToMany(() => Ticket, (ticket) => ticket.ticketType)
  tickets: Ticket[];
}

@Entity()
export class Ticket extends BaseProps {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Event, (event) => event.tickets, { onDelete: 'SET NULL', nullable: true })
  event: Event;

  @ManyToOne(() => TicketType, (ticketType) => ticketType.tickets, { onDelete: 'SET NULL', nullable: true })
  ticketType: TicketType;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  reference: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  first_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ nullable: true })
  qrcode: string;

  @Column({ nullable: true })
  pdf: string;

  @Column({ type: 'boolean', default: false })
  is_expired: boolean;
}
