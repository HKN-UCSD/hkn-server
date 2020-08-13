import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { InductionClass } from './InductionClass';

export enum AppUserRole {
  ADMIN = 'admin',
  OFFICER = 'officer',
  MEMBER = 'member',
  INDUCTEE = 'inductee',
  GUEST = 'guest',
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

  @ManyToOne(() => InductionClass, { nullable: true })
  inductionClass: InductionClass;

  @Column({
    type: 'enum',
    enum: AppUserRole,
    default: AppUserRole.GUEST,
  })
  role: string;
}
