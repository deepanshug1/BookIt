import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Booking } from './booking/booking.model';
import { Event } from './event.model';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}

  eventss = new Subject<Event[]>();
  initalEvent: Event[];
  finalEvent: Event;

  userEmail: string;

  fetch() {
    return this.http.get<Event[]>('http://localhost:3000/events');
  }

  SaveBooking(body) {
    this.http
      .post('http://localhost:3000/bookings', body)
      .subscribe((res) => {});

    console.log('booked');
  }

  getBookings(email: string) {
    return this.http.get<Booking[]>(`http://localhost:3000/bookings/${email}`);
  }

  Save(events: Event) {
    this.http.post('http://localhost:3000/events', events).subscribe();

    console.log('saved');
  }

  // events = [
  //   new Event(
  //     'Euphoria',
  //     'Cultural',
  //     'Annual Cultural Fest of Bennett University',
  //     'assets/1.jpg',
  //     '1-4 April',
  //     'Bennett University',
  //     false
  //   ),
  //   new Event(
  //     'Xenevia',
  //     'Tech',
  //     'Annual Tech Fest of Bennett University',
  //     'assets/1.jpg',
  //     '5-7 April',
  //     'Bennett University',
  //     false
  //   ),
  //   new Event(
  //     'Sunburn',
  //     'Music',
  //     'Annual Musical Fest of International Singers',
  //     'assets/1.jpg',
  //     '23 December',
  //     'Delhi',
  //     false
  //   ),
  //   new Event(
  //     'Zomaland',
  //     'Food',
  //     'Annual Food Fest By Zomato',
  //     'assets/1.jpg',
  //     '27 January',
  //     'Mumbai',
  //     false
  //   ),
  //   new Event(
  //     'Bollywood Nights',
  //     'Music',
  //     'Annual Bollywood Musical Extravaganza',
  //     'assets/1.jpg',
  //     '10-12 February',
  //     'Mumbai',
  //     false
  //   ),
  //   new Event(
  //     'TechFusion',
  //     'Tech',
  //     'Tech Expo showcasing the latest innovations and advancements in technology',
  //     'assets/1.jpg',
  //     '15-18 March',
  //     'Bangalore',
  //     false
  //   ),
  //   new Event(
  //     'Artistry Expo',
  //     'Art',
  //     'Celebration of Creativity featuring renowned artists and their masterpieces',
  //     'assets/1.jpg',
  //     '8-10 May',
  //     'New Delhi',
  //     true
  //   ),
  //   new Event(
  //     'Culinary Delights',
  //     'Food',
  //     'Gourmet Food Festival offering a gastronomic journey around the world',
  //     'assets/1.jpg',
  //     '20-22 June',
  //     'Mumbai',
  //     true
  //   ),
  //   new Event(
  //     'Future World Summit',
  //     'Conference',
  //     'Global Summit exploring emerging trends and future possibilities',
  //     'assets/1.jpg',
  //     '3-5 August',
  //     'New Delhi',
  //     true
  //   ),
  // ];
}
