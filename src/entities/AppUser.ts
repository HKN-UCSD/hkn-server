import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ManyToOne,
  Index,
  BaseEntity,
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
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @PrimaryColumn()
  email: string;

  @Column()
  major: string;

  @Column()
  graduationYear: number;

  @ManyToOne(() => InductionClass, { nullable: true })
  inductionClass: InductionClass;

  @Column({
    type: 'enum',
    enum: AppUserRole,
    default: AppUserRole.INDUCTEE,
  })
  role: string;
}
