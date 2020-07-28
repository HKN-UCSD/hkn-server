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
  MENTOSHIP = 'mentorship',
}

@Entity()
export class Event extends BaseEntity {
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

  @ManyToMany(() => AppUser, { eager: true })
  @JoinTable()
  hosts: AppUser[];

  @OneToMany(
    () => Attendance,
    attendance => attendance.event
  )
  attendances: Attendance[];

  @Column({ nullable: true })
  rsvpURL: string;

  @Column({ nullable: true })
  signInURL: string;

  @Column({ nullable: true })
  fbURL: string;

  @Column({ nullable: true })
  canvaURL: string;
}
