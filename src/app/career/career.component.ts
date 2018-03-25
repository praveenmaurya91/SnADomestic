// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-career',
//   templateUrl: './career.component.html',
//   styleUrls: ['./career.component.css']
// })
// export class CareerComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//import { AngularFireDatabase } from 'angularfire2/database';
import { error } from '@firebase/database/dist/esm/src/core/util/util';
import { FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
//import * as firebase from 'firebase';
import { MatSnackBar } from '@angular/material';
import { CareerService } from '../services/career.service';
import { Career } from '../models/career';
import { Router } from '@angular/router';
@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {

  //items: Observable<any[]>;
  userRegistrationForm: FormGroup;
  career: Career = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: '',
    experience: [''],
    licence: [''],
    car: [''],
    blueCard: [''],
    afp: [''],
  }
  action: string;
  error;
  firstName;
  lastName;
  email;
  phone;
  coverLetter;

  experience = [
    { value: 'No experience' },
    { value: 'Less than 1 year' },
    { value: '2 years' },
    { value: '3 years' },
    { value: '4+ years' },
  ];
  licence = [
    { value: 'Yes' },
    { value: 'No' },
  ];
  car = [
    { value: 'Yes' },
    { value: 'No' },
  ];
  blueCard = [
    { value: 'Yes' },
    { value: 'No' },
  ];
  afp = [
    { value: 'Yes' },
    { value: 'No' },
  ];

  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;

  constructor(
    db: AngularFirestore,
    private afs: AngularFirestore,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private careerService: CareerService,
    private router: Router,
  ) {
    this.createForm();

  }


  ngOnInit() {
  }

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
      coverLetter: ['', [
       // Validators.required
      ]],
      experience: ['', [
        Validators.required
      ]],
      licence: ['', [
        Validators.required
      ]],
      car: ['', [
        Validators.required
      ]],
      blueCard: ['', [
        Validators.required,
      ]],
      afp: ['', [
         Validators.required
      ]],
    });
  }

  onSubmit() {

    this.careerService.addItem(this.career);


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
  firstName: 'First name is required',
  lastName: 'Lirst name is required',
  phone: 'Phone is required',
  email: 'Email must be a valid email address (username@domain)',
  coverLetter: 'Message is required',
  experience: 'Please you need to select one option',
  licence: 'Please you need to select one option',
  car: 'Please you need to select one option',
  blueCard: 'Please you need to select one option',
  afp: 'Please you need to select one option',
};

