import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../models/contact';
@Injectable()
export class ContactService {

  contactCollection: AngularFirestoreCollection<Contact>;
  contacts: Observable<Contact[]>;
  contactDoc: AngularFirestoreDocument<Contact>;

  constructor(public afs: AngularFirestore) { 
    this.contactCollection = this.afs.collection('contacts', ref => ref.orderBy('lastName', 'asc'));
    this.contacts = this.contactCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Contact;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }
/**this function get the collection from the firebase */
  getItems() {
    this.contactCollection = this.afs.collection('contacts', ref => ref.orderBy('lastName', 'asc'));
    this.contacts = this.contactCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Contact;
        data.id = a.payload.doc.id;
        return data;
      });
    });
    return this.contacts;
  }
/**
 * function to add data into the collection
 * @param contact 
 */
  addItem(contact: Contact) {
    this.contactCollection.add(contact);
  }
/**
 * function to delete the data from the collection
 * @param contact 
 */
  deleteItem(contact: Contact) {
    this.contactDoc = this.afs.doc(`contacts/${contact.id}`);
    this.contactDoc.delete();
  }
/**
 * function to update the data
 * @param contact 
 */
  updateItem(contact: Contact) {
    this.contactDoc = this.afs.doc(`contacts/${contact.id}`);
    this.contactDoc.update(contact);
  }
}
