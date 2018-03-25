// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-admin',
//   templateUrl: './admin.component.html',
//   styleUrls: ['./admin.component.css']
// })
// export class AdminComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
//import { User, Users } from '../models/user';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from '../services/auth.service'



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  email: string;
  password: string;
  action: string;
  //user: User;
  //users: Users[];
  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    private afs: AngularFirestore,
    public snackBar: MatSnackBar

  ) {

  }

  ngOnInit() {

  }



  onSubmit() {
    this.authService.emailLogin(this.email, this.password)
      .then((res) => {
        if(res){
          console.log("logged in")
          this.snackBar.open('logged in', this.action, { duration: 2000, });
        }
       else{
          console.log("error")
          this.snackBar.open('logged Error', this.action, { duration: 2000, });
       }
         this.router.navigate(['/dashboard']);
      })
      .catch((err) => {
        console.log("error", err)
        this.snackBar.open('Invalid login', this.action, { duration: 2000, });
        this.router.navigate(['/login']);
      });

  }

}



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
