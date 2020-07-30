import {
  JsonController,
  Param,
  Get,
  Post,
  Delete,
  Body,
} from 'routing-controllers';
import { Inject } from 'typedi';

import { EventRequest } from '@Requests/EventRequest';
import { Event } from '@Entities/Event';
import { EventServiceInterface, EventServiceToken } from '@Services/Interfaces';

@JsonController('/api/event')
export class EventController {
  @Inject(EventServiceToken)
  eventService: EventServiceInterface;

  @Post('/')
  createEvent(@Body() event: EventRequest): Promise<Event> {
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
  updateEvent(
    @Param('id') id: number,
    @Body() event: EventRequest
  ): Promise<Event> {
    return this.eventService.updateEvent(id, event);
  }

  @Delete('/:id')
  deleteEvent(@Param('id') id: number): Promise<Event> {
    return this.eventService.deleteEvent(id);
  }
}
