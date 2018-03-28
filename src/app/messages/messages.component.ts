import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/Contact';
import { MediaMatcher } from '@angular/cdk/layout';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  contacts: Contact[];
  contactEditState: boolean = false;
  contactToEdit: Contact;

  constructor(private contactService: ContactService,
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

    this.contactService.getItems().subscribe(items => {
      this.contacts = items;
    });
  }
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/admin']);
  }
  /********* Contact *************/
  deleteContact(event, contact: Contact) {
    this.clearContactState();
    this.contactService.deleteItem(contact);
  }

  editContact(event, contact: Contact) {
    this.contactEditState = true;
    this.contactToEdit = contact;
  }

  updateContact(contact: Contact) {
    this.contactService.updateItem(contact);
    this.clearContactState();
  }

  clearContactState() {
    this.contactEditState = false;
    this.contactToEdit = null;
  }

}
