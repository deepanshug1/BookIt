import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Event } from '../event.model';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent implements OnInit {
  events: Event[];
  res: Event[];
  eventsub: Subscription;
  constructor(private eventsService: EventsService, private router: Router) {}

  ngOnInit(): void {
    this.eventsub = this.eventsService.fetch().subscribe((res) => {
      this.res = res;

      this.events = this.res;
      this.eventsService.initalEvent = this.events;
      this.eventsService.eventss.next(this.events);
    });
  }

  onSelect(categ: string) {
    if (categ != '') {
      this.events = this.res.filter((event) => event.category === categ);
    } else {
      this.events = this.res;
    }
    this.eventsService.eventss.next(this.events);
    this.router.navigate(['/events/0']);
  }

  async upcoming() {
    const openBookingEvents = this.res.filter(
      (event) => event.openBooking === true
    );

    this.events = openBookingEvents;
    await this.eventsService.eventss.next(this.events);
    this.router.navigate(['/events/0']);
  }
}
