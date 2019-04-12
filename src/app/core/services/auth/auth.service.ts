import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../../models/user.model';
import { Settings } from '../../settings/settings';
import { filter, publishLast, refCount } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: BehaviorSubject<string> = new BehaviorSubject(null);
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient, private snackbar: MatSnackBar) {
    const token = window.localStorage.getItem('token');
    if (token) {
      this.token.next(token);
    }
    /** when user exists, the state of loggedIn is TRUE */
    this.getUserObservable().subscribe(() => {
      this.loggedIn.next(true);
    });
  }

  private getUserObservable() {
    return this.token.asObservable().pipe(filter(item => item !== null));
  }

  public isLoggedInObservable(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  public isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  public login(username, password) {
    const call = this.http.post(
      /** URL */
      Settings.api.auth.login,
      /** PAYLOAD */
      {
        username: username,
        password: password,
      },
    ).pipe(publishLast(), refCount());
    call.subscribe(tokenResponse => {
      const token = tokenResponse['token'];
      window.localStorage.setItem('token', token);
      this.token.next(undefined);
      this.showWelcomeSnackbar();
    });
    return call;
  }

  public logout() {
    window.localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  public register(payload) {
    const call = this.http.post(Settings.api.auth.register, payload).pipe(publishLast(), refCount());
    call.subscribe(result => {

    });
    return call;
  }

  private showWelcomeSnackbar() {
    this.snackbar.open('Welcome! Check Menu > Info for more details on how to use the app.', 'Ok', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }
}
