import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  
  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    ) {}

  /**function to get auth from firebase */
  getAuth() {
    return this.afAuth.authState.map(auth => auth);
  }
  /** logout function*/
  logout() {
    this.afAuth.auth.signOut();
  }
  /**
   * firebase signup function
   * @param email 
   * @param password 
   */
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        return user;
      })
      .catch(error => this.handleError(error));
  }
  /**
   * function for login from firebase
   * @param email 
   * @param password 
   */
  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        return user;
      }).catch(error => this.handleError(error));
  }
  /**
   * error handler function
   * @param error 
   */
  private handleError(error) {
    console.error(error)
  }
}