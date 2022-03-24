import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { InductionClass } from './InductionClass';

export enum EventTypes {
  ADMIN = 'admin',
  OFFICER = 'officer',
  MEMBER = 'member',
  INDUCTEE = 'inductee',
  GUEST = 'guest',
}

export type Availabilities = TimeRange[];

interface TimeRange {
  start: string;
  end: string;
}

/**
 * The AppUser table represents an AppUser entity in the db.
 *
 * It's not called the user table because postgres internally
 * uses the user table for metadata storage.
 */
@Entity()
export class AppUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  major: string;

  @Column({ nullable: true })
  graduationYear: string;

  @ManyToOne(() => InductionClass, { nullable: true, deferrable: 'INITIALLY DEFERRED' })
  inductionClass: InductionClass;

  @Column({
    type: 'enum',
    enum: AppUserRole,
    default: AppUserRole.GUEST,
  })
  role: string;

  @Column({ nullable: true, type: 'json' })
  availabilities: Availabilities;

  @Column({ nullable: true })
  preferredName: string;

  @Column({ nullable: true })
  pronoun: string;

  @Column({ nullable: true })
  customPronoun: string;

  @Column({ nullable: true })
  infoSession: string;

  @Column({ nullable: true })
  courseRequirement: boolean;

  @Column({ nullable: true })
  newsletter: boolean;
}
