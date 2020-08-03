import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class InductionClass {
  @PrimaryColumn()
  quarter: string;

  @Column()
  name: string;

  @Column('date')
  startDate: string;

  @Column('date')
  endDate: string;
}
