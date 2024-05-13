import { Component, Input } from '@angular/core';
import { Booking } from '../../booking.model';

@Component({
  selector: 'app-booked-event',
  templateUrl: './booked-event.component.html',
  styleUrl: './booked-event.component.css',
})
export class BookedEventComponent {
  @Input() booking: Booking;
  @Input() index: number;
}
