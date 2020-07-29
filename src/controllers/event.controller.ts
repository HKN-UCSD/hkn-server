import { Event } from '@Entities/Event';
import { EventService } from '@Services/event.service';
import { Inject } from 'typedi';

import {
  JsonController,
  Param,
  Get,
  Post,
  Delete,
  UseBefore,
} from 'routing-controllers';

import { json } from 'express';
import { EventFromBody } from '@Decorators/EventFromBody';

@JsonController('/api/event')
export class EventController {
  @Inject()
  eventService: EventService;

  @Post('/')
  @UseBefore(json())
  createEvent(@EventFromBody() event: Event): Promise<Event> {
    return this.eventService.createEvent(event);
  }

  @Get('/')
  getMultipleEvents(): Promise<Event[]> {
    return this.eventService.getAllEvents();
  }

  @Get('/:id')
  getEvent(@Param('id') id: number): Promise<Event> {
    return this.eventService.getEventById(id);
  }

  @Post('/:id')
  @UseBefore(json()) // must use if using FromBody decorators
  updateEvent(
    @Param('id') id: number,
    @EventFromBody() event: Event
  ): Promise<Event> {
    event.id = id;
    return this.eventService.updateEvent(event);
  }

  @Delete('/:id')
  deleteEvent(@Param('id') id: number): Promise<Event> {
    return this.eventService.deleteEvent(id);
  }
}
