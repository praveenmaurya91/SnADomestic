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
/**this function get the collection from the firebase */
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
/**
 * function to add data into the collection
 * @param booking 
 */
  addItem(booking: Booking) {
    this.bookingCollection.add(booking);
  }
/**
 * function to delete the data from the collection
 * @param booking  
 */
  deleteItem(booking: Booking) {
    this.bookingDoc = this.afs.doc(`bookings/${booking.id}`);
    this.bookingDoc.delete();
  }
/**
 * function to update the data
 * @param booking 
 */
  updateItem(booking: Booking) {
    this.bookingDoc = this.afs.doc(`bookings/${booking.id}`);
    this.bookingDoc.update(booking);
  }

}
