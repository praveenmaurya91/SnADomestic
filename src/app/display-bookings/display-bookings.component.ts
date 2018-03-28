
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { Booking } from '../models/Booking';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-display-bookings',
  templateUrl: './display-bookings.component.html',
  styleUrls: ['./display-bookings.component.css']
})
export class DisplayBookingsComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  bookings: Booking[];
  bookingEditState: boolean = false;
  bookingToEdit: Booking;

  constructor(
    private bookingService: BookingService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private router: Router) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {

    this.bookingService.getItems().subscribe(items => {
      this.bookings = items;
    });

  }
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/admin']);
  }
  /********* Booking *************/
  deleteBooking(event, booking: Booking) {
    this.clearBookingState();
    this.bookingService.deleteItem(booking);
  }

  editBooking(event, booking: Booking) {
    this.bookingEditState = true;
    this.bookingToEdit = booking;
  }

  updateBooking(booking: Booking) {
    this.bookingService.updateItem(booking);
    this.clearBookingState();
  }

  clearBookingState() {
    this.bookingEditState = false;
    this.bookingToEdit = null;
  }

}
