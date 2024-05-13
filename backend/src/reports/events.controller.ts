import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { currentUserDecorator } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { EventDto } from './dtos/event.dto';
import { responseEventDto } from './dtos/response-event.dto';
import { EventsService } from './events.service';

@UseInterceptors(new SerializeInterceptor(responseEventDto))
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  createEvent(@Body() body: EventDto, @currentUserDecorator() user: User) {
    return this.eventsService.createEvent(body, user);
  }

  @Post('/all')
  createManyEvents(
    @Body() body: EventDto[],
    @currentUserDecorator() user: User,
  ) {
    return this.eventsService.createAllEvents(body, user);
  }

  @Get()
  findAllEvents() {
    return this.eventsService.findAllEvents();
  }
}
