import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { InductionClass } from './InductionClass';

export enum AppUserRole {
  ADMIN = 'admin',
  OFFICER = 'officer',
  MEMBER = 'member',
  INDUCTEE = 'inductee',
}

// This table isn't called a User table because Postgres already
// internally has a User table.
@Entity()
export class AppUser {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @PrimaryColumn()
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
    default: AppUserRole.INDUCTEE,
  })
  role: string;
}
