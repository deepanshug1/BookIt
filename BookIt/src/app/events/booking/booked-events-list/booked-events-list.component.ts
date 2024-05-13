import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventsService } from '../../events.service';
import { Booking } from '../booking.model';

@Component({
  selector: 'app-booked-events-list',
  templateUrl: './booked-events-list.component.html',
  styleUrl: './booked-events-list.component.css',
})
export class BookedEventsListComponent implements OnInit, OnDestroy {
  constructor(private eventsService: EventsService) {}

  bookings: Booking[];
  subs: Subscription;

  ngOnInit() {
    this.subs = this.eventsService
      .getBookings(
        this.eventsService.userEmail ||
          JSON.parse(localStorage.getItem('authUser')).email
      )
      .subscribe((res) => {
        this.bookings = res;
        console.log(this.bookings);
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
