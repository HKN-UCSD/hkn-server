import { Entity, ManyToOne } from 'typeorm';
import { AppUser } from './AppUser';
import { Event } from './Event';

/**
 * The RSVP table is meant to store user rsvps for events.
 */
@Entity()
export class RSVP {
  @ManyToOne(
    () => Event,
    event => event.rsvps,
    { primary: true }
  )
  event: Event;

  @ManyToOne(() => AppUser, { primary: true })
  appUser: AppUser;
}
