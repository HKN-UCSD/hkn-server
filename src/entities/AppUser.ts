import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
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
