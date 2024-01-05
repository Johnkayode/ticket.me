import { Entity, PrimaryGeneratedColumn, Column, Index, Unique, ManyToMany, JoinTable } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseProps } from '../../common/common.entity';
// import { Company } from "./company.entity";

// @Unique('', ['email', 'company'])
@Entity()
export class User extends BaseProps {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  lastName: string;

  @Index({ unique: true })
  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phoneNumber: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'boolean', default: false })
  active: boolean;

  @Column({ type: 'boolean', default: false })
  email_verified: boolean;

  @Column({ type: 'boolean', default: false })
  phone_number_verified: boolean;

  // company: Company[]
}
