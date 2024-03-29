import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { AppUser } from './AppUser';

/**
 * The InductionClass table is meant to represent an induction class.
 * This is used to query inductees by induction class.
 */
@Entity()
export class InductionClass {
  // TODO add validation for what strings are allowed.

  // e.g. FA20
  @PrimaryColumn()
  quarter: string;

  // e.g. "Zeta Kappa"
  @Column()
  name: string;

  // Starting date of the induction cycle for said class
  @Column('date')
  startDate: string;

  // Ending date of the induction cycle for said class
  @Column('date')
  endDate: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  interviewDates: string[];

  @OneToMany(
    () => AppUser,
    affiliate => affiliate.inductionClass,
    { nullable: true }
  )
  affiliates: AppUser[];
}
