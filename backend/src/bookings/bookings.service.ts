import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Booking } from './bookings.entity';
import { BookingDto } from './dtos/booking.dto';

@Injectable()
export class BookingsService {
  constructor(@InjectRepository(Booking) private repo: Repository<Booking>) {}

  createBooking(booking: BookingDto, user: User) {
    const Booking = this.repo.create(booking);
    return this.repo.save(Booking);
  }

  findAllBookings(email: string) {
    return this.repo.find({ where: { email } });
  }
}
