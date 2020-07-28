import { EventService } from '../services/event.service';
import { createParamDecorator } from 'routing-controllers';

import { Container } from 'typedi';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function EventFromBody() {
  return createParamDecorator({
    required: true,
    value: action => {
      const eventService: EventService = Container.get(EventService);
      return eventService.constructEvent(action.request.body);
    },
  });
}
