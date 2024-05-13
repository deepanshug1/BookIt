import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Event } from '../event.model';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.css',
})
export class EventCreateComponent implements OnInit {
  events: Event[];
  constructor(private eventsService: EventsService) {}
  mess: string = null;

  ngOnInit(): void {
    this.mess = null;
    this.eventsService.fetch().subscribe((res) => {
      this.events = res;
    });
  }

  onSubmit(f: NgForm) {
    const newEvent: Event = {
      name: f.value.name,
      category: f.value.category,
      date: f.value.date,
      description: f.value.description,
      imagePath: f.value.imagePath,
      location: f.value.location,
      openBooking: f.value.openBooking.toLowerCase() === 'true' ? true : false,
    };
    this.events = [...this.events, newEvent];
    this.eventsService.Save(newEvent);
    f.reset();
    this.mess = 'Event Successfully Created!';
  }
}
