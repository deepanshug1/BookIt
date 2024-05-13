import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { currentUserDecorator } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { BookingsService } from './bookings.service';
import { BookingDto } from './dtos/booking.dto';
import { responseBookingDto } from './dtos/response-booking.dto';

@UseInterceptors(new SerializeInterceptor(responseBookingDto))
@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post()
  createEvent(@Body() body: BookingDto, @currentUserDecorator() user: User) {
    return this.bookingsService.createBooking(body, user);
  }

  @Get('/:email')
  findAllEvents(@Param('email') email: string) {
    if (!email) {
      return 'give a valid email';
    }
    return this.bookingsService.findAllBookings(email);
  }

  // @Get()
  // findAllEvents(@Body() body: { email: string }) {
  //   return this.bookingsService.findAllBookings(body.email);
  // }
}
