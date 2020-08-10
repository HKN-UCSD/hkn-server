import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { AppUser, Attendance, RSVP } from '@Entities';

export enum EventType {
  PROFESSIONAL = 'professional',
  SOCIAL = 'social',
  TECHNICAL = 'technical',
  MENTORSHIP = 'mentorship',
}

export enum EventStatus {
  PENDING = 'pending',
  READY = 'ready',
  COMPLETE = 'complete',
}

/**
 * The Event table is intended to represent an event.
 */
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  location: string;

  @Column('timestamp')
  startDate: string;

  @Column('timestamp')
  endDate: string;

  @Column({
    type: 'enum',
    enum: EventType,
    nullable: true,
  })
  type: string;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.PENDING,
  })
  status: string;

  @ManyToMany(() => AppUser, { eager: true })
  @JoinTable()
  hosts: AppUser[];

  @OneToMany(
    () => Attendance,
    attendance => attendance.event
  )
  attendances: Attendance[];

  @OneToMany(
    () => RSVP,
    rsvp => rsvp.event
  )
  rsvps: RSVP[];

  @Column({ nullable: true })
  rsvpURL: string;

  @Column({ nullable: true })
  signInURL: string;

  @Column({ nullable: true })
  fbURL: string;

  @Column({ nullable: true })
  canvaURL: string;
}
