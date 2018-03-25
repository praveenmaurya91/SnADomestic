
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {


  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    ) {}

  // Check user status
  getAuth() {
    return this.afAuth.authState.map(auth => auth);
  }

  // Logout User
  logout() {
    this.afAuth.auth.signOut();
  }


  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        return user;
      })
      .catch(error => this.handleError(error));
  }



  //email login
  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        return user;
      }).catch(error => this.handleError(error));
  }



  // If error, console log and notify user
  private handleError(error) {
    console.error(error)
  }
}
