import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedEventsListComponent } from './booked-events-list.component';

describe('BookedEventsListComponent', () => {
  let component: BookedEventsListComponent;
  let fixture: ComponentFixture<BookedEventsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookedEventsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookedEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
