
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

  addItem(career: Career) {
    this.careerCollection.add(career);
  }

  deleteItem(career: Career) {
    this.careerDoc = this.afs.doc(`careers/${career.id}`);
    this.careerDoc.delete();
  }

  updateItem(career: Career) {
    this.careerDoc = this.afs.doc(`careers/${career.id}`);
    this.careerDoc.update(career);
  }

}
