import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {

  }

  canActivate() {
    const subject = new BehaviorSubject(null);
    this.auth.isLoggedInObservable().subscribe(value => {
      if (value) {
        subject.next(false);
      } else {
        subject.next(true);
      }
    });
    return subject.asObservable().pipe(filter(item => item !== null));
  }
}
