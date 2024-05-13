import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Event } from '../event.model';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-event-book',
  templateUrl: './event-book.component.html',
  styleUrl: './event-book.component.css',
  animations: [
    trigger('divstate', [
      state('normal', style({})),
      transition('void=>*', [
        style({
          opacity: 0,
          transform: 'translate(-100px)',
        }),
        animate(500),
      ]),
    ]),
  ],
})
export class EventBookComponent implements OnInit, OnDestroy {
  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  index: number = 0;
  currEvent: Event;
  events: Event[];
  eventsub: Subscription;
  eventsub2: Subscription;
  state: string;

  ngOnInit() {
    this.eventsub2 = this.route.params.subscribe((params) => {
      this.index = params['id'];
      if (this.events) {
        this.currEvent = this.events[this.index];
      } else {
        this.currEvent = this.eventsService.initalEvent[this.index];
      }
    });
    this.eventsub = this.eventsService.eventss.subscribe((res) => {
      this.index = 0;
      this.events = res;
      if (this.events) {
        this.currEvent = this.events[this.index];
      } else {
        this.currEvent = this.eventsService.initalEvent[this.index];
      }
    });
    this.state = 'normal';
  }

  book(currEvent: Event) {
    this.eventsService.finalEvent = currEvent;
    this.router.navigate(['book'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.eventsub2.unsubscribe();
    this.eventsub.unsubscribe();
  }
}
