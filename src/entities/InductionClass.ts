import { Entity, PrimaryColumn, Column } from 'typeorm';

/**
 * The InductionClass table is meant to represent an induction class.
 * This is used to query inductees by induction class.
 */
@Entity()
export class InductionClass {
  // TODO add validation for what strings are allowed.

  // e.g. fa20 (lower case to match string in url)
  @PrimaryColumn()
  quarter: string;

  // e.g. "Zeta Kappa"
  @Column()
  name: string;

  // Starting date of the induction cycle for said class
  @Column('date')
  startDate: string;

  // Starting date of the induction cycle for said class
  @Column('date')
  endDate: string;

  @Column('simple-json')
  interviewDates: Date[];
}
