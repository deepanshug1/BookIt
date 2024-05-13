import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsController } from './bookings.controller';
import { Booking } from './bookings.entity';
import { BookingsService } from './bookings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking])],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}
