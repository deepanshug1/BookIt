import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Event } from '../event.model';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent implements OnInit {
  selectedEvent: Event;
  ticks: number = 1;
  submitted: boolean = false;
  timer: any = null;
  email: string;

  constructor(private eventsService: EventsService, private router: Router) {}

  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem('authUser')).email;

    this.selectedEvent = this.eventsService.finalEvent;
    this.eventsService.userEmail = this.email;
    console.log(this.selectedEvent);
  }
  onBook(f: NgForm) {
    const body = {
      email: this.email,
      name: f.value.name,
      tickets: f.value.tickets,
      event: this.selectedEvent.name,
    };
    this.eventsService.SaveBooking(body);

    this.submitted = true;
    f.reset();
    this.timer = setTimeout(() => {
      this.router.navigate(['/about']);
    }, 3000);
  }
}
