import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CorsInterceptor } from './auth/auth-interceptor.service';
import { AuthComponent } from './auth/auth.component';
import { BookedEventComponent } from './events/booking/booked-events-list/booked-event/booked-event.component';
import { BookedEventsListComponent } from './events/booking/booked-events-list/booked-events-list.component';
import { BookingComponent } from './events/booking/booking.component';
import { EventBookComponent } from './events/event-book/event-book.component';
import { EventCreateComponent } from './events/event-create/event-create.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventStartComponent } from './events/event-start/event-start.component';
import { EventsComponent } from './events/events.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    AboutComponent,
    EventsComponent,
    EventDetailsComponent,
    EventListComponent,
    EventStartComponent,
    EventBookComponent,
    BookingComponent,
    EventCreateComponent,
    FooterComponent,
    BookedEventsListComponent,
    BookedEventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true }, // Provide the interceptor
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
