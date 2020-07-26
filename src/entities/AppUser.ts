import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm';

import { InductionClass } from './InductionClass';

export enum AppUserRole {
  ADMIN = 'admin',
  OFFICER = 'officer',
  MEMBER = 'member',
  INDUCTEE = 'inductee',
}

// user table taken by internal postgres stuff already
@Entity()
export class AppUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @PrimaryColumn()
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
