import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { error } from '@firebase/database/dist/esm/src/core/util/util';
import { FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatSnackBar } from '@angular/material';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  userRegistrationForm: FormGroup;
  contact: Contact = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
  action: string;
  error;
  firstName;
  lastName;
  email;
  phone;
  message;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;

  constructor(
    db: AngularFirestore,
    private afs: AngularFirestore,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router,
  ) { 
   this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.userRegistrationForm = this.formBuilder.group({
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      phone: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      message: ['', [
        Validators.required
      ]],
    });
  }
/** 
 * onSubmit function call the service to store the data into the firebase
*/
  onSubmit() {
    this.contactService.addItem(this.contact);
    this.snackBar.open('Your message has been sent', this.action, { duration: 4000, } );  
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
  firstName: 'First name is required',
  lastName: 'Lirst name is required',
  phone: 'Phone is required',
  email: 'Email must be a valid email address (username@domain)',
  message: 'Message is required',
};

