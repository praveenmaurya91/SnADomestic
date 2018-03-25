import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBookingsComponent } from './display-bookings.component';

describe('DisplayBookingsComponent', () => {
  let component: DisplayBookingsComponent;
  let fixture: ComponentFixture<DisplayBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
