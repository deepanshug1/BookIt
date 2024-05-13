import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent implements OnInit {
  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {}

  // onSave() {
  //   this.eventsService.Save();
  // }
}
