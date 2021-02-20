import { ViewEntity, Connection, ViewColumn } from 'typeorm';
import { InductionClass } from './InductionClass';
import { Event, EventType } from './Event';

// later do some grouping by cycle
@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('event.id', 'eventId')
      .addSelect('event.name', 'eventName')
      .addSelect('event.type', 'eventType')
      .addSelect('induction_class.name', 'eventCycle')
      .addSelect('induction_class.year', 'eventYear')
      .from(Event, 'event')
      .innerJoin(
        InductionClass,
        'induction_class',
        'event.startDate >= induction_class.startDate AND event.endDate < induction_class.endDate'
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
  eventCycle: string;

  @ViewColumn()
  eventYear: string;
}
