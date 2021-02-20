import { ViewEntity, Connection, ViewColumn } from 'typeorm';
import { Quarter } from './Quarter';
import { Event, EventType } from './Event';

// later do some grouping by quarter
@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('event.id', 'eventId')
      .addSelect('event.name', 'eventName')
      .addSelect('event.type', 'eventType')
      .addSelect('quarter.name', 'eventQuarter')
      .addSelect('quarter.cycle', 'eventCycle')
      .from(Event, 'event')
      .innerJoin(
        Quarter,
        'quarter',
        'event.startDate >= quarter.startDate AND event.endDate < quarter.endDate'
      ),
})
export class EventsView {
  @ViewColumn()
  eventId: number;

  @ViewColumn()
  eventName: string;

  @ViewColumn()
  eventType: EventType;

  @ViewColumn()
  eventQuarter: string;

  @ViewColumn()
  eventCycle: string;
}
