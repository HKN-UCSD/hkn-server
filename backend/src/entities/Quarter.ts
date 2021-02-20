import { Entity, Column, PrimaryColumn } from 'typeorm';

/**
 * The Quarter table is intended to represent an Quarter.
 */
@Entity()
export class Quarter {
  @PrimaryColumn()
  name: string;

  @Column('timestamp')
  startDate: string;

  @Column('timestamp')
  endDate: string;

  @Column('text')
  cycle: string;
}
