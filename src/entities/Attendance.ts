import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AppUser } from './AppUser';
import { Event } from './Event';

// TODO composite index on attendee + event
// TODO add start and end times instead of relying on duration.

/**
 * The Attendance entity is to record users attending events. See comments below for further detail.
 */
@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AppUser)
  attendee: AppUser;

  // Officer who checked off attendee
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
