import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class InductionClass extends BaseEntity {
  @PrimaryColumn()
  quarter: string;

  @Column()
  name: string;

  @Column('date')
  startDate: string;

  @Column('date')
  endDate: string;
}
