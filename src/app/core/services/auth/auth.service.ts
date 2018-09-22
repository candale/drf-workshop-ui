import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../../models/user.model';
import { Settings } from '../../settings/settings';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<User> = new BehaviorSubject(null);
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    const user = window.localStorage.getItem('user');
    if (user) {
      this.user.next(new User(JSON.parse(user)));
    }
    /** when user exists, the state of loggedIn is TRUE */
    this.getUserObservable().subscribe(() => {
      this.loggedIn.next(true);
    })
  }

  private getUserObservable() {
    return this.user.asObservable().pipe(filter(item => item !== null));
  }

  public isLoggedInObservalbe(): Observable<boolean> {
    return this.loggedIn.asObservable().pipe(filter(item => item !== false));
  }

  public isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  public login(email, password) {
    this.http.post(
      /** URL */
      Settings.api.auth.login,
      /** PAYLOAD */
      {
        email: email,
        password: password,
      },
    ).subscribe(userData => {
      window.localStorage.setItem('user', JSON.stringify(userData));
      this.user.next(new User(userData));
    })
  }
}
