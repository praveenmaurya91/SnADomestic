// import { Injectable } from '@angular/core';

// @Injectable()
// export class BookingService {

//   constructor() { }

// }


import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Booking } from '../models/booking';
@Injectable()
export class BookingService {

  bookingCollection: AngularFirestoreCollection<Booking>;
  bookings: Observable<Booking[]>;
  bookingDoc: AngularFirestoreDocument<Booking>;

  constructor(public afs: AngularFirestore) {

    this.bookingCollection = this.afs.collection('bookings', ref => ref.orderBy('date', 'desc'));

    this.bookings = this.bookingCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Booking;

        data.id = a.payload.doc.id;

        return data;
      });
    });
  }


  getItems() {
    this.bookingCollection = this.afs.collection('bookings', ref => ref.orderBy('date', 'desc'));

    this.bookings = this.bookingCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Booking;

        data.id = a.payload.doc.id;

        return data;
      });
    });
    return this.bookings;
  }

  addItem(booking: Booking) {
    this.bookingCollection.add(booking);
  }

  deleteItem(booking: Booking) {
    this.bookingDoc = this.afs.doc(`bookings/${booking.id}`);
    this.bookingDoc.delete();
  }

  updateItem(booking: Booking) {
    this.bookingDoc = this.afs.doc(`bookings/${booking.id}`);
    this.bookingDoc.update(booking);
  }

}
