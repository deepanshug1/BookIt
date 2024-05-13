import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminGaurd } from './auth/admin-gaurd.gaurd';
import { AuthGaurd } from './auth/auth-gaurd.gaurd';
import { AuthComponent } from './auth/auth.component';
import { BookedEventsListComponent } from './events/booking/booked-events-list/booked-events-list.component';
import { BookingComponent } from './events/booking/booking.component';
import { EventBookComponent } from './events/event-book/event-book.component';
import { EventCreateComponent } from './events/event-create/event-create.component';
import { EventStartComponent } from './events/event-start/event-start.component';
import { EventsComponent } from './events/events.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/about' },
  { path: 'about', component: AboutComponent },
  { path: 'bookings', component: BookedEventsListComponent },
  { path: 'auth', component: AuthComponent },
  {
    path: 'events/:id/book',
    canActivate: [AuthGaurd],
    component: BookingComponent,
  },
  {
    path: 'events',
    canActivate: [AuthGaurd],
    component: EventsComponent,
    children: [
      { path: '', component: EventStartComponent },
      {
        path: ':id',
        pathMatch: 'full',
        component: EventBookComponent,
      },
    ],
  },
  {
    path: 'create',
    canActivate: [AdminGaurd],
    component: EventCreateComponent,
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
