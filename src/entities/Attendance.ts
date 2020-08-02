import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { AppUser } from './AppUser';
import { Event } from './Event';

// TODO composite index on attendee + event
@Entity()
export class Attendance extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AppUser)
  attendee: AppUser;

  @ManyToOne(() => AppUser)
  officer: AppUser;

  @ManyToOne(() => Event)
  event: Event;

  // num_hours
  @Column('float')
  duration: number;

  // indicates whether or not attendee was inductee at time of attendance
  @Column()
  isInductee: boolean;
}
