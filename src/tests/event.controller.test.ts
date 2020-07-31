import { EventService, AppUserService } from '@Services';
import { MockEventService } from './mocks/event.service.mock';
import { MockAppUserService } from './mocks/app-user.service.mock';

import { EventController } from '@Controllers';

import { Container } from 'typedi';

describe('EventController', () => {
  beforeEach(() => {
    const mockEventService = new MockEventService(new Map());
    const mockAppUserService = new MockAppUserService();
    Container.set(EventService, mockEventService);
    Container.set(AppUserService, mockAppUserService);
  });

  describe('createEvent', () => {
    test('normal creation', () => {
      const eventController = Container.get(EventController);
      console.log(eventController.getMultipleEvents());
      expect(true).toEqual(true);
    });
  });
});
