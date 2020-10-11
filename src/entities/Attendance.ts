import { IsOptional } from 'class-validator';
import { Entity, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { AppUser } from './AppUser';
import { Event } from './Event';

// TODO add start and end times instead of relying on duration.

/**
 * The Attendance entity is to record users attending events. See comments below for further detail.
 */
@Entity()
export class Attendance {
  @ManyToOne(() => AppUser, { primary: true, deferrable: 'INITIALLY DEFERRED' })
  attendee: AppUser;

  // Officer who checked off attendee
  @ManyToOne(() => AppUser, { deferrable: 'INITIALLY DEFERRED', nullable: true })
  officer: AppUser;

  @ManyToOne(() => Event, { primary: true, deferrable: 'INITIALLY DEFERRED' })
  event: Event;

  @CreateDateColumn({ nullable: true })
  startTime?: Date;

  @Column('timestamp', { nullable: true })
  endTime?: Date;

  // indicates whether or not attendee was inductee at time of attendance
  @Column()
  isInductee: boolean;
}
