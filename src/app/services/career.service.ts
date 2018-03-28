
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Career } from '../models/career';

@Injectable()
export class CareerService {

  careerCollection: AngularFirestoreCollection<Career>;
  careers: Observable<Career[]>;
  careerDoc: AngularFirestoreDocument<Career>;

  constructor(public afs: AngularFirestore) {
    this.careerCollection = this.afs.collection('careers', ref => ref.orderBy('firstName', 'asc'));
    this.careers = this.careerCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Career;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }
/**this function get the collection from the firebase */
  getItems() {
    this.careerCollection = this.afs.collection('careers', ref => ref.orderBy('firstName', 'asc'));
    this.careers = this.careerCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Career;
        data.id = a.payload.doc.id;
        return data;
      });
    });
    return this.careers;
  }
/**
 * function to add data into the collection
 * @param career 
 */
  addItem(career: Career) {
    this.careerCollection.add(career);
  }
/**
 * function to delete the data from the collection
 * @param career 
 */
  deleteItem(career: Career) {
    this.careerDoc = this.afs.doc(`careers/${career.id}`);
    this.careerDoc.delete();
  }
/**
 * function to update the data
 * @param career 
 */
  updateItem(career: Career) {
    this.careerDoc = this.afs.doc(`careers/${career.id}`);
    this.careerDoc.update(career);
  }

}
