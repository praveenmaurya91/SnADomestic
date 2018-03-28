import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//import { AngularFireDatabase } from 'angularfire2/database';
import { error } from '@firebase/database/dist/esm/src/core/util/util';
import { FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
//import * as firebase from 'firebase';
import { MatSnackBar } from '@angular/material';
import { BookingService } from '../services/booking.service';
import { Booking } from '../models/booking';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit {

 // items: Observable<any[]>;
  userRegistrationForm: FormGroup;

  booking: Booking = {
    name: '',
    email: '',
    phone: '',
    message: '',
    address: '',
    date: '',
    service: [''],
    bedroom: [''],
    bathroom: [''],
   
  }
  action: string;
  error;
  service = [
    { value: '0', viewValue: 'General Cleaning' },
    { value: '1', viewValue: 'Specialised Cleaning' },
    { value: '2', viewValue: 'Ironing' },
    { value: '3', viewValue: 'Lawn Mowing & Gardening Care' },
    { value: '4', viewValue: 'High Pressure Cleaning' },
    { value: '5', viewValue: 'Carwashing' },
    { value: '6', viewValue: 'others' },
  ];
  bathroom = [
    { value: '0' },
    { value: '1' },
    { value: '2' },
    { value: '3'},
    { value: '4'},
    { value: '5' },
    { value: '6' },
    { value: '7'},
    { value: '8'},
    { value: '9' },
  ];
  bedroom = [
    { value: '0' },
    { value: '1' },
    { value: '2' },
    { value: '3' },
    { value: '4' },
    { value: '5' },
    { value: '6' },
    { value: '7' },
    { value: '8' },
    { value: '9' },
  ];

  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;

  constructor(
    db: AngularFirestore,
    private afs: AngularFirestore,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private router: Router,
  ) { 
    this.createForm();
  }

  ngOnInit() {
   
  }
  createForm() {
    this.userRegistrationForm = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      address: ['', [
        Validators.required
      ]],
      phone: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      date: ['', [
        Validators.required
      ]],
      message: ['', []],
      service: ['', []],
      bedroom: ['', []],
      bathroom: ['', []],
    });
  }
/**
 * submit function to call the booking service and sending the data to the firestore
 */
  onSubmit() {
    this.bookingService.addItem(this.booking);
    this.snackBar.open('Your message has been sent', this.action, { duration: 4000, });
    this.router.navigate(['']);
  }
}


/**
 * Custom validator functions for reactive form validation
 */
export class CustomValidators {
  /**
  * Validates that child controls in the form group are equal
  */
  static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
    const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
    const isValid = otherControlNames.every(controlName => formGroup.get(controlName).value === formGroup.get(firstControlName).value);
    return isValid ? null : { childrenNotEqual: true };
  }
}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.parent.invalid && control.touched;
  }
}

/**
* Collection of reusable RegExps
*/
export const regExps: { [key: string]: RegExp } = {
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
};

/**
 * Collection of reusable error messages
 */
export const errorMessages: { [key: string]: string } = {
  name: 'First name is required',
  phone: 'Phone is required',
  email: 'Email must be a valid email address (username@domain)',
  address: 'Address is required',
  date: 'Date is required',
};

