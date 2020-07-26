import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { AppUser } from './AppUser';
import { Attendance } from './Attendance';

export enum EventType {
  PROFESSIONAL = 'professional',
  SOCIAL = 'social',
  TECHNICAL = 'technical',
}

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  location: string;

  @Column('timestamp')
  startDate: string;

  @Column('timestamp')
  endDate: string;

  @Column()
  type: string;

  @ManyToMany(() => AppUser)
  @JoinTable()
  hosts: AppUser[];

  @OneToMany(
    () => Attendance,
    attendance => attendance.event
  )
  attendances: Attendance[];

  @Column()
  rsvpURL: string;

  @Column()
  signInURL: string;

  @Column()
  fbURL: string;

  @Column()
  canvaURL: string;
}
