import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../event.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css',
  animations: [
    trigger('divstate', [
      state('normal', style({})),
      transition('void=>*', [
        style({
          opacity: 0,
          border: '0.5rem solid black',
          // transform: 'translate(-100px)',
          scale: 0,
        }),
        animate(350),
      ]),
    ]),
  ],
})
export class EventDetailsComponent {
  @Input() event: Event;
  @Input() index: number;

  constructor(private router: Router) {}

  state = 'normal';
}
